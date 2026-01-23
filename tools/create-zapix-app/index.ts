#!/usr/bin/env node
import fs from "fs-extra";
import kleur from "kleur";
import path from "path";
import prompts from "prompts";

const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

async function main() {
  console.log(kleur.cyan("⚡ Welcome to create-zapix-app!"));

  const response = await prompts({
    type: "text",
    name: "name",
    message: "App name:",
    initial: "my-zapix-app",
  });

  const appName = response.name;
  const targetDir = path.resolve(process.cwd(), appName);

  if (fs.existsSync(targetDir)) {
    console.log(kleur.red(`Directory ${appName} already exists!`));
    process.exit(1);
  }

  fs.copySync(path.join(TEMPLATES_DIR, "aws-lambda"), targetDir);

  console.log(kleur.green(`✅ Created ${appName}!`));
  console.log(kleur.yellow(`cd ${appName} && pnpm install`));
}

main();
