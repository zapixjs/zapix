#!/usr/bin/env node

import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { createAppCommand } from "./commands/create-app.js";
import { generateHandler } from "./commands/generate.js";

const program = new Command(packageJson.name).version(
  packageJson.version,
  "-v, --version",
  "Output the current version of create-zapix-app.",
);

// ----------------------
// create-app subcommand
// ----------------------
program
  .command("create-app <project-name>")
  .alias("c")
  .description("Create a new Zapix project")
  .option("--template <template>", "Select project template")
  .option("--example <example>", "Select an example app")
  .option("--eslint", "Use ESLint")
  .option("--biome", "Use Biome")
  .option("--import-alias <alias>", "Set import alias")
  .option("--skip-install", "Skip installing packages")
  .option("--use-npm", "Use npm")
  .option("--use-pnpm", "Use pnpm")
  .option("--use-yarn", "Use Yarn")
  .action(createAppCommand);

// ----------------------
// generate subcommand
// ----------------------
program
  .command("generate <type> [name]")
  .alias("g")
  .description("Generate module/controller/middleware")
  .option("-m, --module <modulename>", "Specify the module")
  .action(generateHandler);

program.parse(process.argv);
