# Custom Components Library 🎨

## 📝 Task

[Task](https://drive.google.com/file/d/1C148FRnWfXVoRDslDWcYac3bEhebdIAV/view)

---

## ⚙️ Installation

To integrate this library into your project, simply run:

```bash
npm install @slapxxi/custom-components-lib
# or
yarn add @slapxxi/custom-components-lib
```

---

## 🏗️ Usage

Import and use components like so:

```jsx
import { Button, Card, Modal } from '@slapxxi/custom-components-lib';

function Example() {
  return (
    <Card title="Welcome">
      <p>This is a custom card component.</p>
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>
    </Card>
  );
}
```

Refer to the [Storybook](#running-storybook) for live previews, prop tables, and usage examples.

## 🔧 Development

### Running Storybook

Explore all components interactively:

```bash
npm run storybook
```

This spins up Storybook, showcasing component demos, documentation, and controls.

### Running Tests

Ensure code correctness with:

```bash
npm run test
```

Based on Jest and React Testing Library, all components include unit tests.

### Linting & Formatting

Maintain code quality and style consistency:

```bash
npm run lint
```
