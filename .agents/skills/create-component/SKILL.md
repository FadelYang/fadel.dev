---
name: create-component
description: Rules and guidelines for creating, modifying, or generating new UI components in this Next.js and Tailwind CSS v4 codebase.
---

# Creating a New Component

Use these guidelines whenever you need to create a new UI component.

## 1. Directory Structure & Placement

- **Primitive UI Elements**: Place generic, reusable primitives in `components/ui/` (e.g., [components/ui](file:///Users/fadelanumah/Documents/playground/fadel.dev/components/ui)).
  - First, check if the component can be added using `npx shadcn@latest add <component-name>`.
- **Feature & Layout Components**: Place domain-specific or layout-level components in the `components/` root directory (e.g., [components](file:///Users/fadelanumah/Documents/playground/fadel.dev/components)).
- **Sub-components**: If a component is highly specific to a single page, it can be co-located with the page in its `app/` subfolder (e.g., [app/(homepage)](file:///Users/fadelanumah/Documents/playground/fadel.dev/app/(homepage))).

## 2. Server vs. Client Components

- **Server Components (Default)**: Write server components by default. Do not add `'use client'` unless necessary.
- **Client Components**: Add the `'use client'` directive at the very top of the file *only* if the component:
  - Uses state or lifecycle hooks (`useState`, `useReducer`, `useEffect`, etc.).
  - Uses client-side router hooks (`usePathname`, `useRouter`, `useSearchParams`).
  - Attaches interactive event listeners (`onClick`, `onChange`, etc.).
  - Uses browser-only APIs (`window`, `document`).

## 3. Styling & Tailwind CSS v4

- **Tailwind v4**: Use modern utility classes compatible with Tailwind v4.
- **Dynamic Classes**: Import `cn` from `@/lib/utils` to merge class names dynamically:
  ```typescript
  import { cn } from "@/lib/utils"
  ```
- **Responsive & Interactive States**: Always style hover, active, focus-visible, and disabled states.

## 4. TypeScript & Props Conventions

- **Typing Props**: Explicitly define the props type using an interface or type.
- **HTML Element Props**: When wrapping basic HTML elements, extend their default attributes:
  ```typescript
  import * as React from "react"
  import { cn } from "@/lib/utils"

  export interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
  }

  export function Input({ className, label, ...props }: InputProps) {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input className={cn("border rounded-md px-3 py-2", className)} {...props} />
      </div>
    )
  }
  ```
- **Lucide Icons**: Use `lucide-react` for icons if needed.

## 5. Check List Before Done

1. Make sure TypeScript compilation passes without errors.
2. Confirm files are imported using `@/` path aliases.
3. Verify that interactive components have appropriate accessibility (ARIA) attributes or use Radix primitives.
