# Survey Platform

A monorepo containing a survey builder and survey form applications.

## Structure

```
survey-platform/
├── apps/
│   ├── builder/          # Survey Builder app (@survey/builder)
│   └── survey/           # Survey Form app (@survey/app)
├── packages/
│   ├── shared/           # Shared components & types (@survey/shared)
│   └── builder-components/  # Builder-specific components (@survey/builder-components)
└── tooling/              # Shared configs (future)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Installation

```bash
# Install pnpm if you haven't
npm install -g pnpm

# Install dependencies
pnpm install
```

### Development

```bash
# Run the builder app
pnpm dev:builder

# Run the survey app (in another terminal)
pnpm dev:survey

# Or run the default (builder)
pnpm dev
```

### Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:builder
pnpm build:survey
```

## Packages

### @survey/shared

Shared library containing:
- **Types**: Survey, Question, Answer, Response types
- **Registry**: Question type registry for extensibility
- **Components**: 
  - UI components (Button, Input, Card, etc.)
  - SurveyForm component
  - Question type components (SingleChoice, MultipleChoice, TextInput, RatingScale)
- **Validation**: Zod schemas for validation

### @survey/builder-components

Builder-specific components:
- BaseQuestionBuilder
- DragHandle, DeleteButton, EditButton
- QuestionTypeSelector

## Adding New Question Types

1. Create a new folder in `packages/shared/src/components/questions/`
2. Implement the form component
3. Create the config file
4. Register it in the index.ts

Example:
```typescript
// packages/shared/src/components/questions/my-type/index.ts
import { questionRegistry } from "../../../registry";
import { myTypeConfig } from "./myType.config";

questionRegistry.register(myTypeConfig);
```

## Architecture

The platform uses:
- **Preact Signals** for state management
- **shadcn/ui** for UI components
- **dnd-kit** for drag and drop
- **Zod** for validation
- **Tailwind CSS v4** for styling
