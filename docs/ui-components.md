# shadcn UI Standards

This document outlines all shadcn UI usage, component installation, and implementation patterns for the Link Shortener project. All UI elements must use shadcn components.

## Core Principles

### 1. shadcn UI Exclusively
- **All UI components must come from shadcn** - do NOT create custom components
- shadcn provides Radix UI primitives styled with Tailwind CSS
- Components are copied into your project (not npm dependencies)
- Consistency and maintainability are guaranteed through shadcn

### 2. Project Configuration
- **Style**: New York (modern, clean aesthetic)
- **CSS Variables**: Enabled for theme customization
- **Icons**: lucide-react (all icons come from lucide)
- **Icon Library**: Fully integrated with components
- **Tailwind CSS**: v4 with PostCSS
- **Component Aliases**: 
  - `@/components` → `components/`
  - `@/components/ui` → `components/ui/`

## Component Installation

### Using the shadcn CLI

Install new components using the shadcn CLI:

```bash
# Install a single component
npx shadcn add button

# Install multiple components at once
npx shadcn add button input card dropdown-menu

# Install with custom options
npx shadcn add --help
```

All components install to `components/ui/` automatically.

### Component Discovery

Browse available components at [ui.shadcn.com](https://ui.shadcn.com)

Common components for this project:
- `button` - All interactive buttons
- `input` - Form fields
- `card` - Content containers
- `dialog` - Modal dialogs
- `dropdown-menu` - Dropdown menus
- `label` - Form labels
- `form` - Form management (React Hook Form integrated)
- `table` - Data tables
- `toast` - Notifications
- `sheet` - Sidebar/drawer panels

## Implementation Patterns

### Basic Component Usage

```typescript
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click Me
    </Button>
  )
}
```

### Component Variants

All shadcn components support variants for common use cases:

```typescript
import { Button } from "@/components/ui/button"

// Button variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Forms with React Hook Form

shadcn Form component integrates with React Hook Form:

```typescript
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

export function MyForm() {
  const form = useForm()

  function onSubmit(values: unknown) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Dialog/Modal Pattern

```typescript
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Dialog description goes here
          </DialogDescription>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  )
}
```

### Cards for Content Organization

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card subtitle or description</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content goes here */}
      </CardContent>
    </Card>
  )
}
```

## Styling & Customization

### Tailwind CSS Integration

All shadcn components use Tailwind CSS classes:

```typescript
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return (
    <div className="flex gap-4 p-6">
      <Button className="w-full">Full Width Button</Button>
    </div>
  )
}
```

### Theme Variables

CSS variables control the theme and can be customized in `app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    --card: 0 0% 100%;
    --primary: 0 0% 3.6%;
    --secondary: 0 0% 96.1%;
    /* More variables as needed */
  }

  .dark {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    /* Dark mode variables */
  }
}
```

### Tailwind CSS Utilities

Combine shadcn with Tailwind utilities for custom styling:

```typescript
<div className="p-4 rounded-lg border bg-card shadow-sm">
  <h3 className="text-lg font-semibold mb-2">Heading</h3>
  <p className="text-muted-foreground">Description text</p>
</div>
```

## File Organization

### Component Structure

```
components/
├── ui/                    # shadcn components (auto-generated)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── [Feature]/             # Feature-specific components
│   ├── FeatureForm.tsx
│   ├── FeatureCard.tsx
│   └── index.ts
└── layout/                # Layout components
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Footer.tsx
```

### Import Paths

Always use path aliases for consistency:

```typescript
// ✅ Good
import { Button } from "@/components/ui/button"
import { MyFeature } from "@/components/MyFeature"

// ❌ Avoid
import { Button } from "../../../components/ui/button"
import { MyFeature } from "../../components/MyFeature"
```

## TypeScript & Props

### Extending Component Props

Components are fully typed with TypeScript:

```typescript
import { Button, type ButtonProps } from "@/components/ui/button"

interface MyButtonProps extends ButtonProps {
  isLoading?: boolean
}

export function MyButton({ isLoading, ...props }: MyButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? "Loading..." : props.children}
    </Button>
  )
}
```

### Type-Safe Variants

```typescript
import { Button } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

type ButtonVariant = VariantProps<typeof Button>["variant"]
type ButtonSize = VariantProps<typeof Button>["size"]

export function StyledButton(props: {
  variant: ButtonVariant
  size: ButtonSize
}) {
  return <Button {...props} />
}
```

## Icons with lucide-react

All icons come from lucide-react:

```typescript
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, Search, X } from "lucide-react"

export function IconExample() {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon">
        <Menu className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <Search className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <X className="h-5 w-5" />
      </Button>
    </div>
  )
}
```

Browse available icons at [lucide.dev](https://lucide.dev)

## Common Pitfalls to Avoid

- ❌ Creating custom components instead of using shadcn
- ❌ Importing from wrong paths (use `@/components/ui/...` aliases)
- ❌ Overriding component styles directly instead of using Tailwind utilities
- ❌ Using icon libraries other than lucide-react
- ❌ Forgetting to install components before importing them

## Best Practices

- ✅ Install components only when needed (keep dependencies minimal)
- ✅ Use consistent component variants across similar UI elements
- ✅ Leverage Tailwind utilities for spacing, sizing, and layout
- ✅ Keep components focused with single responsibility
- ✅ Export components from `index.ts` files for cleaner imports
- ✅ Use TypeScript strict mode for all component props
- ✅ Follow the shadcn style guide strictly

## Useful Resources

- [Official shadcn Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://radix-ui.com) - Underlying component library
- [Tailwind CSS Documentation](https://tailwindcss.com) - Styling system
- [lucide-react Icons](https://lucide.dev) - Icon library

---

**Last Updated**: February 26, 2026  
**Version**: 1.0.0
