# Contributing to Zapix

Thank you for your interest in contributing to Zapix! This guide will help you get started.

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** (comes with Node.js)

### Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/<your-username>/zapix.git
cd zapix
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run the tests to verify everything works:

```bash
npm run test
```

## Development Workflow

### Scripts

| Command | Description |
| --- | --- |
| `npm run build` | Compile TypeScript (`tsc`) |
| `npm run test` | Run tests once (`vitest run`) |
| `npm run test:watch` | Run tests in watch mode (`vitest`) |
| `npm run lint` | Check code style (`biome check .`) |
| `npm run lint:fix` | Auto-fix lint issues (`biome check . --write`) |

### Project Structure

```
packages/zapix/
  src/
    adapters/aws/    # AWS Lambda + API Gateway adapter
    core/            # Router, Response, and core types
    middlewares/     # Built-in middleware
    types/           # Shared type definitions
  __tests__/         # Test files
```

### Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run `npm run lint:fix` before committing to ensure your code matches the project style.

### Writing Tests

Tests are written with [Vitest](https://vitest.dev/). Place test files in the `__tests__/` directory. Run `npm run test:watch` during development for fast feedback.

## Making a Contribution

### Reporting Bugs

Open an issue at [github.com/raihansharifrimon/zapix/issues](https://github.com/raihansharifrimon/zapix/issues) with:

- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Node.js version and AWS runtime details (if applicable)

### Suggesting Features

Open an issue describing:

- The problem your feature solves
- A proposed API or usage example
- Any alternatives you considered

### Pull Request Process

1. Create a feature branch from `main`:

```bash
git checkout -b feat/your-feature
```

2. Make your changes, ensuring:
   - All existing tests pass (`npm run test`)
   - New features include tests
   - Code passes lint checks (`npm run lint`)
   - TypeScript compiles without errors (`npm run build`)

3. Write a clear commit message describing the change.

4. Open a pull request against `main` with:
   - A summary of what changed and why
   - Any breaking changes noted
   - Links to related issues

5. Address any review feedback. A maintainer will merge once approved.

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add query parameter parsing
fix: handle empty body in POST requests
docs: update middleware examples
refactor: simplify route matching logic
test: add coverage for error handler
```

## Code of Conduct

Be respectful, inclusive, and constructive. We follow the [Contributor Covenant v1.4](http://contributor-covenant.org/version/1/4/). See the full text at the link for details.

Instances of unacceptable behavior can be reported to the project maintainers via [GitHub Issues](https://github.com/raihansharifrimon/zapix/issues).

## License

By contributing to Zapix, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
