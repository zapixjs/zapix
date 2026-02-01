import { CreateProjectConfigs } from "../commands/create-app.js";

export type TemplateType = "default" | "aws-serverless";

export interface GetTemplateFileArgs {
  template: TemplateType;
  file: string;
}

export interface InstallTemplateArgs extends CreateProjectConfigs {
  isOnline: boolean;
}
