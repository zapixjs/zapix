import type { CreateTodoInput, Todo, UpdateTodoInput } from "./types/todo";

// In-memory storage (replace with database in production)
const todos: Map<string, Todo> = new Map();

export const todosService = {
	create(input: CreateTodoInput): Todo {
		const todo: Todo = {
			id: crypto.randomUUID(),
			title: input.title,
			completed: false,
			createdAt: new Date().toISOString(),
		};
		todos.set(todo.id, todo);
		return todo;
	},

	findAll(): Todo[] {
		return Array.from(todos.values());
	},

	findById(id: string): Todo | undefined {
		return todos.get(id);
	},

	update(id: string, input: UpdateTodoInput): Todo | undefined {
		const todo = todos.get(id);
		if (!todo) return undefined;

		const updated: Todo = {
			...todo,
			...(input.title !== undefined && { title: input.title }),
			...(input.completed !== undefined && { completed: input.completed }),
		};
		todos.set(id, updated);
		return updated;
	},

	delete(id: string): boolean {
		return todos.delete(id);
	},
};
