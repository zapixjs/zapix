// import path from "node:path";
// import fs from "fs-extra";
// import kleur from "kleur";

// export async function generateMiddlewareCommand(middlewareName: string, _flags: Record<string, any>) {
// 	if (!middlewareName) {
// 		console.log(kleur.red("❌ Please provide a middleware name"));
// 		process.exit(1);
// 	}

// 	const middlewaresDir = path.resolve(process.cwd(), "src/middlewares");
// 	await fs.ensureDir(middlewaresDir);

// 	const fileName = `${middlewareName}.ts`;
// 	const filePath = path.join(middlewaresDir, fileName);

// 	if (fs.existsSync(filePath)) {
// 		console.log(kleur.red(`❌ Middleware already exists: ${fileName}`));
// 		process.exit(1);
// 	}

// 	const template = `import { Middleware, Request, Response } from "@/types";

// /**
//  * Middleware: ${middlewareName}
//  */
// export const ${middlewareName}Middleware: Middleware = async (req: Request, res: Response, next) => {
//   // TODO: implement middleware logic
//   console.log("${middlewareName} middleware triggered");

//   return next();
// };
// `;

// 	await fs.writeFile(filePath, template, "utf-8");
// 	console.log(kleur.green(`✔ Middleware created: src/middlewares/${fileName}`));
// }
