import { authorizationMiddleware } from "@/core/middlewares";
import { Router } from "zapix";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "./todos.controller";

const router = new Router();

router.post("/todos", authorizationMiddleware, createTodo);
router.get("/todos", getTodos);
router.get("/todos/{id}", getTodoById);
router.put("/todos/{id}", updateTodo);
router.delete("/todos/{id}", deleteTodo);

export default router;
