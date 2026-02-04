import type { Controller } from "zapix";
import { ZapixError } from "zapix";
import { todosService } from "./todos.service";
import type { CreateTodoInput, UpdateTodoInput } from "./types/todo";

export const createTodo: Controller = async (req, res) => {
  const { title } = req.body as unknown as CreateTodoInput;

  if (!title) {
    throw new ZapixError("VALIDATION_ERROR", "Title is required");
  }

  const todo = todosService.create({ title });
  return res.status(201).json(todo);
};

export const getTodos: Controller = async (_req, res) => {
  const todos = todosService.findAll();
  return res.json(todos);
};

export const getTodoById: Controller = async (req, res) => {
  const { id } = req.params as { id: string };
  const todo = todosService.findById(id);

  if (!todo) {
    throw new ZapixError("NOT_FOUND", "Todo not found");
  }

  return res.json(todo);
};

export const updateTodo: Controller = async (req, res) => {
  const { id } = req.params as { id: string };
  const input = req.body as UpdateTodoInput;

  const todo = todosService.update(id, input);

  if (!todo) {
    throw new ZapixError("NOT_FOUND", "Todo not found");
  }

  return res.json(todo);
};

export const deleteTodo: Controller = async (req, res) => {
  const { id } = req.params as { id: string };

  const deleted = todosService.delete(id);

  if (!deleted) {
    throw new ZapixError("NOT_FOUND", "Todo not found");
  }

  return res.status(204).send();
};
