import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sema } from "async-sema";
import glob from "fast-glob";
import pc from "picocolors";
import { copy } from "../utils/copy.js";
import { getPnpmMajorVersion } from "../utils/get-pkg-manager.js";
import { install } from "../utils/install.js";
import type { GetTemplateFileArgs, InstallTemplateArgs } from "./types.js";

const { bold, cyan } = pc;

function sorted(obj: Record<string, string>) {
	return Object.keys(obj)
		.sort()
		.reduce((acc: Record<string, string>, key: string) => {
			acc[key] = obj[key] as string;

			return acc;
		}, {});
}

/**
 * Get the directory where template files are stored.
 * After compilation, this resolves from dist/templates/ to the root templates/ folder.
 */
const getTemplatesDir = (): string => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	return path.join(__dirname, "../../templates");
};

/**
 * Get the file path for a given file in a template, e.g. "next.config.js".
 */
export const getTemplateFile = ({ template, file }: GetTemplateFileArgs): string => {
	return path.join(getTemplatesDir(), template, file);
};

/**
 * Install a Zapix internal template to a given `root` directory.
 */
export const installTemplate = async (args: InstallTemplateArgs) => {
	const { template, linter, projectName, projectPath, importAlias, packageManager, skipInstall, isOnline } = args;

	const useEslint = linter === "eslint";
	const useBiome = linter === "biome";

	console.log(bold(`Using ${packageManager}.`));

	/**
	 * Copy the template files to the target directory.
	 */
	console.log("\nInitializing project with template:", template, "\n");

	const templatePath = path.join(getTemplatesDir(), template);

	const copySource = ["**"];
	if (!useEslint) copySource.push("!eslint.config.mjs");
	if (!useBiome) copySource.push("!biome.json");

	await copy(copySource, projectPath, {
		parents: true,
		cwd: templatePath,
		rename(name) {
			switch (name) {
				case "gitignore": {
					return `.${name}`;
				}
				case "README-template.md": {
					return "README.md";
				}
				default: {
					return name;
				}
			}
		},
	});

	const tsconfigFile = path.join(projectPath, "tsconfig.json");

	await fs.writeFile(tsconfigFile, (await fs.readFile(tsconfigFile, "utf8"))?.replace(`"@/*":`, `"${importAlias}":`));

	// update import alias in any files if not using the default

	if (importAlias !== "@/*") {
		const files = await glob("**/*", {
			cwd: projectPath,
			dot: true,
			stats: false,
			// We don't want to modify compiler options in [ts/js]config.json
			// and none of the files in the .git folder
			// TODO: Refactor this to be an allowlist, rather than a denylist,
			// to avoid corrupting files that weren't intended to be replaced

			ignore: ["tsconfig.json", ".git/**/*"],
		});

		const writeSema = new Sema(8, { capacity: files.length });
		await Promise.all(
			files.map(async (file) => {
				await writeSema.acquire();
				const filePath = path.join(projectPath, file);
				if ((await fs.stat(filePath)).isFile()) {
					await fs.writeFile(
						filePath,
						(await fs.readFile(filePath, "utf8"))?.replace(`@/`, `${importAlias.replace(/\*/g, "")}`),
					);
				}
				writeSema.release();
			}),
		);
	}

	/** Copy the version from package.json or override for tests. */
	// const version = process.env.NEXT_PRIVATE_TEST_VERSION ?? pkg.version;

	type PackageJsonDraft = {
		name: string;
		version: string;
		private: boolean;
		scripts: Record<string, string>;
		dependencies: Record<string, string>;
		devDependencies?: Record<string, string>;
	};

	/** Create a package.json for the new project and write it to disk. */
	const packageJson: PackageJsonDraft = {
		name: projectName,
		version: "0.1.0",
		private: true,
		scripts: {
			dev: `zapix dev`,
			build: `zapix build`,
			...(useEslint && { lint: "eslint" }),
			...(useBiome && { lint: "biome check", format: "biome format --write" }),
		},
		/**
		 * Default dependencies.
		 */
		dependencies: {
			zapix: "0.2.0",
		},
		devDependencies: {
			typescript: "^5",
			"@types/node": "^20",
		},
	};

	/* Default ESLint dependencies. */
	if (useEslint) {
		packageJson.devDependencies = {
			...packageJson.devDependencies,
			eslint: "^9",
		};
	}

	/* Biome dependencies. */
	if (useBiome) {
		packageJson.devDependencies = {
			...packageJson.devDependencies,
			"@biomejs/biome": "2.4.11",
		};
	}

	const devDeps = Object.keys(packageJson.devDependencies ?? {}).length;
	if (!devDeps) delete packageJson.devDependencies;

	// Sort dependencies and devDependencies alphabetically
	if (packageJson.dependencies) {
		packageJson.dependencies = sorted(packageJson.dependencies);
	}

	if (packageJson.devDependencies) {
		packageJson.devDependencies = sorted(packageJson.devDependencies);
	}

	if (packageManager === "pnpm") {
		// Only create pnpm-workspace.yaml for pnpm v10+.
		// In v9, having a pnpm-workspace.yaml (even with packages: []) causes
		// ERR_PNPM_ADDING_TO_ROOT errors when running `pnpm add`.
		// In v10, the packages field can be omitted entirely.
		// If we can't determine the version, assume latest (v10+) since we already
		// know pnpm is being used at this point.
		const pnpmMajorVersion = getPnpmMajorVersion();
		if (pnpmMajorVersion === null || pnpmMajorVersion >= 10) {
			const pnpmWorkspaceYaml = ["packages:"].join(os.EOL);

			await fs.writeFile(path.join(projectPath, "pnpm-workspace.yaml"), pnpmWorkspaceYaml);
		}
	}

	await fs.writeFile(path.join(projectPath, "package.json"), JSON.stringify(packageJson, null, 2) + os.EOL);

	if (skipInstall) return;

	console.log("\nInstalling dependencies:");
	for (const dependency in packageJson.dependencies) console.log(`- ${cyan(dependency)}`);

	if (devDeps) {
		console.log("\nInstalling devDependencies:");
		for (const dependency in packageJson.devDependencies) console.log(`- ${cyan(dependency)}`);
	}

	console.log();

	await install(packageManager, isOnline);
};

export * from "./types.js";
