# ShopWave App - Copilot Instructions

## Quick Reference

### Build & Development Commands

```bash
npm start                                        # Start dev server (localhost:4200)
npm run build                                    # Production build
npm run watch                                    # Development build with watch mode
npm test                                         # Run all tests with Vitest
ng test --watch=false --browsers=jsdom          # Run tests without watch mode
```

**Linting/Formatting:**
- Prettier is configured. Run `npx prettier --write .` to format code
- No dedicated linter configured (use TypeScript strict mode checks)

## Architecture Overview

### Project Structure
- **src/app/** - Main application component, routing configuration, and app config
- **src/components/** - Reusable UI components (Header, Footer, Home, etc.)
- **src/main.ts** - Bootstrap entry point
- **src/styles.css** - Global styles
- **angular.json** - Angular build configuration

### Technology Stack
- **Angular 21** - Using standalone components (no NgModule)
- **Vitest** - Unit testing framework
- **Bootstrap 5** - CSS framework for styling
- **RxJS 7.8** - Reactive programming utilities (integrated with Angular)
- **TypeScript 5.9** - Strict mode enabled

### Routing
Routes are defined in `src/app/app.routes.ts`. Currently empty but configured with `provideRouter()` in `app.config.ts`. Add new routes as the array expands.

## Key Conventions

### Component Architecture
All components follow Angular's **standalone component pattern**:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-name',           // Lowercase kebab-case with 'app-' prefix
  imports: [/* import dependencies here */], // Standalone imports
  templateUrl: './component-name.html',
  styleUrl: './component-name.css',
})
export class ComponentName { }
```

**File naming:** `ComponentName.ts` (PascalCase for component classes)
**Selector naming:** `app-*` prefix (lowercase kebab-case)
**Test files:** `ComponentName.spec.ts` (colocated with component)

### File Organization
Each component has:
- `component-name.ts` - Component class
- `component-name.html` - Template
- `component-name.css` - Component scoped styles
- `component-name.spec.ts` - Unit tests

### Component Imports
Components declare their dependencies in the `imports` array. This is required for standalone components to function.

### State Management
Use Angular Signals for reactive state:

```typescript
import { signal } from '@angular/core';

export class MyComponent {
  protected readonly mySignal = signal('initial value');
}
```

### TypeScript Configuration
- **Strict mode enabled** - No `any` types, strict null checks, etc.
- **No implicit returns** - Functions must explicitly return values
- **No fallthrough switch cases** - Switch statements must have breaks or explicit flow control
- **Import helpers enabled** - For optimized transpilation

### Styling
- Global styles in `src/styles.css`
- Component-scoped styles in individual `.css` files
- Bootstrap 5 is available (imported in angular.json)
- Popper.js included for Bootstrap interactive components

## Common Tasks

### Generate a New Component
```bash
ng generate component component-name
```
This scaffolds a component with .ts, .html, .css, and .spec.ts files.

### Run Tests for a Specific File
Tests are colocated with components. To run tests, use:
```bash
npm test -- --include="**/component-name.spec.ts"
```

### Add a New Route
Edit `src/app/app.routes.ts` and add a new route object. Import the component in `app.ts` or lazy-load it with `loadComponent`.

## Notes

- The `modles` directory in `src/` appears to be unused/misspelled (should be `models` for service/data models if needed)
- Standalone components require explicit imports - there are no implicit global providers
- CSS budget limits are configured: 500kB initial, 1MB maximum for production builds
