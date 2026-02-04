import { awsLambdaAdapter } from "zapix/aws";
import todoRouter from "./modules/todos/routes";

// Export the Lambda handler
export const todoHandler = awsLambdaAdapter(todoRouter);
