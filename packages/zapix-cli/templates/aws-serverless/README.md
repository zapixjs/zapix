# Zapix AWS Serverless Template

Starter template for building a Zapix API on AWS Lambda + API Gateway using Serverless Framework.

## Quick Start

```bash
npm install
npm run dev
```

Local API runs with `serverless-offline` on `http://localhost:3000`.

## Scripts

- `npm run dev` - Run locally with Serverless Offline
- `npm run build` - Compile TypeScript to `dist`
- `npm run lint` - Check code style with Biome
- `npm run lint:fix` - Auto-fix Biome issues
- `npm run deploy` - Deploy to AWS

## Project Structure

```text
src/
  handlers.ts                  # Lambda handler entry
  core/
    middlewares/
      auth.middleware.ts       # Example authorization middleware
    infra/
      logger.ts                # Infra/services setup
  modules/
    todos/
      routes.ts                # Todo routes
      todos.controller.ts      # HTTP handlers
      todos.service.ts         # Business logic (in-memory)
      types/todo.ts            # Todo types
```

## API Endpoints

- `POST /todos` - Create todo
- `GET /todos` - List todos
- `GET /todos/{id}` - Get todo by id
- `PUT /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

## Notes

- This template uses in-memory storage in `src/modules/todos/todos.service.ts` (data resets on restart).
- `src/core/middlewares/auth.middleware.ts` is intentionally simple example middleware for Zapix dev users.
- Main Lambda adapter setup is in `src/handlers.ts`.

## Deploy

Make sure AWS credentials are configured, then:

```bash
npm run deploy
```
