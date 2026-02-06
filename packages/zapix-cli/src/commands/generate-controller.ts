import path from "node:path";
import fs from "fs-extra";
import kleur from "kleur";

export async function generateControllerCommand(controllerName: string, _flags: Record<string, string>) {
	if (!controllerName) {
		console.log(kleur.red("❌ Please provide a controller name"));
		process.exit(1);
	}

	const controllersDir = path.resolve(process.cwd(), "src/controllers");
	await fs.ensureDir(controllersDir);

	const fileName = `${controllerName}.ts`;
	const filePath = path.join(controllersDir, fileName);

	if (fs.existsSync(filePath)) {
		console.log(kleur.red(`❌ Controller already exists: ${fileName}`));
		process.exit(1);
	}

	const template = `import { Controller, Request, Response } from "@/types";

/**
 * Controller: ${controllerName}
 */
export const ${controllerName}Controller: Controller = async (req: Request, res: Response) => {
  // TODO: implement controller logic
  return res.json({ message: "${controllerName} controller works!" });
};
`;

	await fs.writeFile(filePath, template, "utf-8");
	console.log(kleur.green(`✔ Controller created: src/controllers/${fileName}`));
}
