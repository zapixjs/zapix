import path from "node:path";
import fs from "fs-extra";
import kleur from "kleur";

export async function createModuleCommand(moduleName: string, flags: Record<string, string>) {
	console.log(flags, "flags");

	if (!moduleName) {
		console.log(kleur.red("❌ You must provide a module name"));
		process.exit(1);
	}

	const modulesDir = path.resolve(process.cwd(), "src/modules");
	await fs.ensureDir(modulesDir);

	const moduleDir = path.join(modulesDir, moduleName);
	if (fs.existsSync(moduleDir)) {
		console.log(kleur.red(`❌ Module "${moduleName}" already exists`));
		process.exit(1);
	}

	await fs.ensureDir(moduleDir);
	await fs.writeFile(path.join(moduleDir, "index.ts"), `// Module: ${moduleName}\n\nexport {};\n`);

	console.log(kleur.green(`✔ Module "${moduleName}" created at src/modules/${moduleName}`));
}
