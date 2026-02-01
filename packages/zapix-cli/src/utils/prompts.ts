import prompts from "prompts";

interface GetOptions {
  projectName?: string;
}

export async function getOptions({ projectName }: GetOptions) {
  return prompts([
    {
      type: "text",
      name: "projectName",
      message: "Project name?",
      initial: projectName || "zapix-app",
      validate: (name: string) => {
        if (!name || name.trim().length === 0)
          return "Project name cannot be empty";
        if (!/^[\w-]+$/.test(name))
          return "Use only letters, numbers, '-' or '_'";
        return true;
      },
    },
    {
      type: "select",
      name: "example",
      message: "Select project template",
      choices: [
        { title: "Node (default)", value: "default" },
        { title: "AWS Serverless", value: "aws-serverless" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "linter",
      message: "Select linter (optional)",
      choices: [
        {
          title: "Biome (recommended)",
          value: "biome",
          description: "Fast formatter & linter",
        },
        {
          title: "ESLint",
          value: "eslint",
          description: "Comprehensive lint rules",
        },
        { title: "None", value: "none", description: "Skip linter" },
      ],
      initial: 0,
    },
    {
      type: "confirm",
      name: "install",
      message: "Install dependencies after project creation?",
      initial: true,
    },
  ]);
}
