import retry from "async-retry";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path, { resolve } from "node:path";
import picocolors from "picocolors";
import prompts from "prompts";
import {
  getTemplateFile,
  installTemplate,
  TemplateType,
} from "../templates/index.js";
import {
  downloadAndExtractExample,
  downloadAndExtractRepo,
  existsInRepo,
  getRepoInfo,
  hasRepo,
  RepoInfo,
} from "../utils/examples.js";
import { getPkgManager, PackageManager } from "../utils/get-pkg-manager.js";
import { tryGitInit } from "../utils/git.js";
import { install } from "../utils/install.js";
import { isFolderEmpty } from "../utils/is-folder-empty.js";
import { getOnline } from "../utils/is-online.js";
import { isWriteable } from "../utils/is-writeable.js";

export interface CreateProjectConfigs {
  projectName: string;
  projectPath: string;
  packageManager: PackageManager;
  template: string;
  example?: string;
  examplePath?: string; // repo URL
  linter: string;
  importAlias: string;
  skipInstall: boolean;
  disableGit: boolean;
}

interface CreateAppOptions extends CreateProjectConfigs {
  eslint?: boolean;
  biome?: boolean;
  useNpm?: boolean;
  usePnpm?: boolean;
  useYarn?: boolean;
}

const handleSigTerm = () => process.exit(0);
process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const defaultsConfigs: CreateProjectConfigs = {
  projectName: "my-api-app",
  projectPath: "", // path of root dir
  template: "default",
  packageManager: "npm",
  example: undefined,
  examplePath: undefined,
  linter: "biome",
  importAlias: "@/*",
  skipInstall: false,
  disableGit: false,
};

export async function createAppCommand(
  projectName: string,
  options: CreateAppOptions,
) {
  const questions = [];

  if (!options.template) {
    questions.push({
      type: "select",
      name: "template",
      message: "Select template:",
      initial: 0,
      choices: [
        {
          title: "AWS Serverless",
          value: "aws-serverless",
          description:
            "Build a serverless backend with AWS Lambda, API Gateway",
        },
        {
          title: "Default (Raw Node.js)",
          value: "default",
          description: "A plain Node.js project with minimal setup.",
        },
      ],
    });
  }

  if (!options.example) {
    questions.push({
      type: "select",
      name: "example",
      message: "Select an app example to bootstrap:",
      initial: 0,
      choices: [
        {
          title: "None",
          value: "none",
          description: "Start with a blank project; no example code included.",
        },
        {
          title: "CRUD Backend (Dynamoose)",
          value: "with-dynamoose",
          description:
            "Backend with DynamoDB using Dynamoose ORM, full CRUD example.",
        },
        {
          title: "CRUD Backend (Mongoose)",
          value: "with-mongoose",
          description:
            "Backend with MongoDB using Mongoose ORM, full CRUD example.",
        },
      ],
    });
  }

  if (!options.eslint && !options.biome) {
    questions.push({
      type: "select",
      name: "linter",
      message: "Which linter would you like to use?",
      initial: 0,
      choices: [
        {
          title: "Biome (Recommended)",
          value: "biome",
          description: "Fast formatter & linter",
        },
        {
          title: "ESLint",
          value: "eslint",
          description: "Comprehensive lint rules",
        },
        { title: "None", value: "none", description: "Skip linter setup" },
      ],
    });
  }

  if (!options.importAlias) {
    const importAliasPattern = /^[^*"]+\/\*\s*$/;
    const styledImportAlias = picocolors.blue("import alias");

    questions.push({
      type: "toggle",
      name: "customizeImportAlias",
      message: `Would you like to customize the ${styledImportAlias} (\`${defaultsConfigs.importAlias}\` by default)?`,
      active: "Yes",
      inactive: "No",
      defaults: defaultsConfigs.importAlias,
    });

    questions.push({
      type: (prev: string) => (prev ? "text" : null),
      name: "importAlias",
      message: `What ${styledImportAlias} would you like configured?`,
      initial: defaultsConfigs.importAlias,
      validate: (value: string) =>
        importAliasPattern.test(value)
          ? true
          : "Import alias must follow the pattern <prefix>/*",
    });
  }

  if (
    !options.useNpm &&
    !options.usePnpm &&
    !options.useYarn &&
    !options.skipInstall
  ) {
    questions.push({
      type: "confirm",
      name: "skipInstall",
      message: "Do you want to install packages now?",
      initial: true,
    });

    questions.push({
      type: (prev: string) => (prev ? "select" : null),
      name: "packageManager",
      message: "Which package manager would you like to use?",
      choices: [
        {
          title: "npm",
          value: "npm",
          description: "Default Node.js package manager",
        },
        {
          title: "pnpm",
          value: "pnpm",
          description: "Fast and efficient package manager",
        },
        {
          title: "Yarn",
          value: "yarn",
          description: "Stable, widely-used package manager",
        },
      ],
      initial: 0,
    });
  }

  const answers = questions.length ? await prompts.prompt(questions) : {};

  // Merge options + answers
  const config: CreateProjectConfigs = {
    ...defaultsConfigs,
    ...options,
    ...answers,
    projectName,
    disableGit: false,
  };

  console.log(
    picocolors.yellow(
      `  ______                  _
 |___  /                 (_)
    / /    __ _   _ __    _  __  __
   / /    / _\` | | '_ \\  | | \\ \\/ /
  / /__  | (_| | | |_) | | |  >  <
 /_____|  \\__,_| | .__/  |_| /_/\\_\\
                 | |
                 |_|               `,
    ),
  );

  console.log("Creating project... ✅");

  const projectPath = resolve(config.projectName);

  const packageManager: PackageManager =
    config.packageManager || getPkgManager();

  await createProject({
    projectName: config.projectName,
    projectPath,
    packageManager,
    template: config.template,
    example: config.example !== "none" ? config.example : undefined,
    linter: config.linter,
    importAlias: config.importAlias,
    skipInstall: config.skipInstall,
    disableGit: config.disableGit,
  });
}

export class DownloadError extends Error {}

export async function createProject(
  configs: CreateProjectConfigs,
): Promise<void> {
  const {
    disableGit,
    projectPath,
    skipInstall,
    example,
    examplePath,
    packageManager,
    template,
  } = configs;

  let repoInfo: RepoInfo | undefined;

  if (example) {
    let repoUrl: URL | undefined;

    try {
      repoUrl = new URL(example);
    } catch (error: unknown) {
      const err = error as Error;
      // TypeError is thrown when the URL is invalid. Equivalent of doing `err.code !== "ERR_INVALID_URL"` in Node.js
      if (!(err instanceof TypeError)) {
        console.error(error);
        process.exit(1);
      }
    }

    if (repoUrl) {
      if (repoUrl.origin !== "https://github.com") {
        console.error(
          `Invalid URL: ${picocolors.red(
            `"${example}"`,
          )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`,
        );
        process.exit(1);
      }

      repoInfo = await getRepoInfo(repoUrl, examplePath);

      if (!repoInfo) {
        console.error(
          `Found invalid GitHub URL: ${picocolors.red(
            `"${example}"`,
          )}. Please fix the URL and try again.`,
        );
        process.exit(1);
      }

      const found = await hasRepo(repoInfo);

      if (!found) {
        console.error(
          `Could not locate the repository for ${picocolors.red(
            `"${example}"`,
          )}. Please check that the repository exists and try again.`,
        );
        process.exit(1);
      }
    } else if (example !== "__internal-testing-retry") {
      const found = await existsInRepo(example);

      if (!found) {
        console.error(
          `Could not locate an example named ${picocolors.red(
            `"${example}"`,
          )}. It could be due to the following:\n`,
          `1. Your spelling of example ${picocolors.red(
            `"${example}"`,
          )} might be incorrect.\n`,
          `2. You might not be connected to the internet or you are behind a proxy.`,
        );
        process.exit(1);
      }
    }
  }

  const root = path.resolve(projectPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again.",
    );
    console.error(
      "It is likely you do not have write permissions for this folder.",
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  mkdirSync(root, { recursive: true });
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = packageManager === "yarn";
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  console.log(`Creating a new Zapix app in ${picocolors.green(root)}.`);
  console.log();

  process.chdir(root);

  const packageJsonPath = path.join(root, "package.json");
  let hasPackageJson = false;

  if (example) {
    try {
      if (repoInfo) {
        const repoInfo2 = repoInfo;
        console.log(
          `Downloading files from repo ${picocolors.cyan(
            example,
          )}. This might take a moment.`,
        );
        console.log();
        await retry(() => downloadAndExtractRepo(root, repoInfo2), {
          retries: 3,
        });
      } else {
        console.log(
          `Downloading files for example ${picocolors.cyan(
            example,
          )}. This might take a moment.`,
        );
        console.log();
        await retry(() => downloadAndExtractExample(root, example), {
          retries: 3,
        });
      }
    } catch (reason) {
      function isErrorLike(err: unknown): err is { message: string } {
        return (
          typeof err === "object" &&
          err !== null &&
          typeof (err as { message?: unknown }).message === "string"
        );
      }
      throw new DownloadError(
        isErrorLike(reason) ? reason.message : reason + "",
      );
    }
    // Copy `.gitignore` if the application did not provide one
    const ignorePath = path.join(root, ".gitignore");
    if (!existsSync(ignorePath)) {
      copyFileSync(
        getTemplateFile({
          template: template as TemplateType,
          file: "gitignore",
        }),
        ignorePath,
      );
    }

    hasPackageJson = existsSync(packageJsonPath);
    if (!skipInstall && hasPackageJson) {
      console.log("Installing packages. This might take a couple of minutes.");
      console.log();

      await install(packageManager, isOnline);
      console.log();
    }
  } else {
    /**
     * If an example repository is not provided for cloning, proceed
     * by installing from a template.
     */

    await installTemplate({
      ...configs,
      isOnline,
    });
  }

  if (disableGit) {
    console.log("Skipping git initialization.");
    console.log();
  } else if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === projectPath) {
    cdpath = appName;
  } else {
    cdpath = projectPath;
  }

  console.log(
    `${picocolors.green("Success!")} Created ${appName} at ${projectPath}`,
  );

  if (hasPackageJson) {
    console.log("Inside that directory, you can run several commands:");
    console.log();
    console.log(
      picocolors.cyan(`  ${packageManager} ${useYarn ? "" : "run "}dev`),
    );
    console.log("    Starts the development server.");
    console.log();
    console.log(
      picocolors.cyan(`  ${packageManager} ${useYarn ? "" : "run "}build`),
    );
    console.log("    Builds the app for production.");
    console.log();
    console.log(picocolors.cyan(`  ${packageManager} start`));
    console.log("    Runs the built app in production mode.");
    console.log();
    console.log("We suggest that you begin by typing:");
    console.log();
    console.log(picocolors.cyan("  cd"), cdpath);
    console.log(
      `  ${picocolors.cyan(`${packageManager} ${useYarn ? "" : "run "}dev`)}`,
    );
  }
  console.log();
}
