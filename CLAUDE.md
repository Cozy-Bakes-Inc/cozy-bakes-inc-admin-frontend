# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cozy Bakes Inc Admin** is a Next.js 16 admin dashboard for managing bakery operations. The application provides interfaces for authentication, dashboard analytics, product management (products & categories), order management, customer management, reviews, reports, settings, and contact form management.

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui, Radix UI
- **Data Fetching**: TanStack React Query 5.96.2, Axios 1.13.6
- **Forms**: React Hook Form 7.71.2 + Zod 4.3.6 validation
- **UI Components**: Input OTP, Framer Motion, Lucide React icons, react-day-picker, Swiper
- **Package Manager**: pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server (localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── (auth)/         # Authentication pages (login, OTP, password reset)
│   ├── (main)/         # Protected admin pages (wrapped by main layout)
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
├── components/
│   ├── auth/           # Auth-specific UI components
│   ├── main/           # Admin section components (dashboard, orders, etc)
│   │   ├── sidebar/    # Navigation sidebar
│   │   ├── dashboard/  # Dashboard charts and cards
│   │   ├── orders/     # Order management UI
│   │   ├── customers/  # Customer management UI
│   │   ├── categories/ # Category management UI
│   │   ├── products/   # Product management UI
│   │   └── ...
│   └── ui/            # Reusable UI primitives (dialog, scroll-area, etc)
├── services/          # API layer
│   ├── queries/       # React Query hooks for fetching (useXyzQuery pattern)
│   ├── mutations/     # React Query mutations (useXyzMutation pattern)
│   └── index.ts       # Axios instance, safeApi, baseAPI exports
├── lib/
│   └── utils/         # Utility functions (helpers, auth, query config)
├── types/             # TypeScript type definitions
├── interfaces/        # Interface definitions (pagination, image, etc)
├── schemas/           # Zod validation schemas (auth forms)
├── constants/         # App constants and config
├── hooks/             # Custom React hooks (useCustomQuery)
├── layout/            # Layout wrapper components (auth, main)
├── data/              # Static data (dashboard stats, mock data)
└── provider/          # React context providers (QueryProvider)
```

## Architecture Patterns

### API Layer
- **Centralized Axios instance** (`src/services/index.ts`) with automatic Bearer token injection via interceptors
- **Response handling pattern**: `safeApi()` returns `ApiResult<T, E>` with `{ ok, status, data/error, message }`
- **Unauthorized (401) handler**: Registered globally to handle session expiry (logout on 401 with Authorization header)
- **Base URL**: `process.env.NEXT_PUBLIC_API_BASE_URL`

### Data Fetching
- **React Query integration** via `QueryProvider` wrapping the app
- **Query pattern**: Custom hooks in `src/services/queries/` (e.g., `useDashboardQuery`)
- **Mutation pattern**: Custom hooks in `src/services/mutations/` (e.g., `useAuthLogin`)
- **Query config**: Centralized in `src/lib/utils/query.ts`

### Form Validation
- **Validation library**: Zod schemas in `src/schemas/` subdirectories
- **Form handling**: React Hook Form with Zod validation (e.g., LoginForm integrates with email/password schemas)
- **Error display**: Validation errors extracted from API responses and displayed to users

### Authentication
- **Token storage**: Via `getToken()` utility (uses localStorage by default)
- **Auth flow**: Login → OTP Verification → New Password (for first-time users)
- **Protected routes**: Main section routes wrapped by `(main)` layout which requires auth
- **Logout**: Triggered when 401 response received with Authorization header

### Styling
- **CSS Framework**: Tailwind CSS with custom configuration
- **Component libraries**: shadcn/ui and Radix UI for accessible, composable components
- **CSS Modules**: Used for isolated scoped styles (e.g., system-loader.module.css, loader.css)
- **Design tokens**: Variables in Tailwind config for colors, spacing, animations

## Common Development Tasks

### Adding a New Page
1. Create directory in `src/app/(main)/[feature-name]/`
2. Add `page.tsx` component
3. Import/use components from `src/components/main/[feature-name]/`
4. Create service hooks in `src/services/queries/` if fetching data

### Adding a New API Integration
1. Create query hook in `src/services/queries/[feature].ts` (uses `useMutation` or `useQuery`)
2. Create mutation hook in `src/services/mutations/[feature].ts` if modifying data
3. Use `safeApi()` from `src/services/index.ts` for API calls
4. Import and use hooks in component pages

### Adding Form Validation
1. Create Zod schema in `src/schemas/[section]/[form-name].ts`
2. Use schema in React Hook Form via `resolver: zodResolver(schema)`
3. Hook Form handles validation errors from schema and API

### Styling Components
1. Use Tailwind classes inline (primary approach)
2. For complex/isolated styles: create `.module.css` file and import as module
3. UI primitives (dialog, scroll-area) are in `src/components/ui/`

## Key Files & Their Roles

| File | Purpose |
|------|---------|
| `src/services/index.ts` | Axios instance, safeApi, baseAPI, unauthorized handler registration |
| `src/provider/query.tsx` | QueryClientProvider setup with unauthorized session handler |
| `src/lib/utils/query.ts` | React Query default config (retry, staleTime, etc) |
| `src/types/axios.ts` | `ApiResult<T, E>` and error response types |
| `next.config.ts` | Image remote patterns (Figma, API servers), server action body limit |
| `tsconfig.json` | Path alias `@/*` → `src/*` for clean imports |

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL

## Common Patterns

### Using React Query
```typescript
// In src/services/queries/example.ts
import { useQuery } from "@tanstack/react-query";
import { safeApi } from "@/services";

export const useExampleQuery = (id: string) => {
  return useQuery({
    queryKey: ["example", id],
    queryFn: async () => {
      const result = await safeApi("GET", `/example/${id}`);
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });
};
```

### Using React Query Mutations
```typescript
// In src/services/mutations/example.ts
import { useMutation } from "@tanstack/react-query";
import { safeApi } from "@/services";

export const useExampleMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const result = await safeApi("POST", "/example", payload);
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });
};
```

### Form with Validation
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth/login";

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate } = useLoginMutation();

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

## Development Notes

- **Imports**: Use path alias `@/` for all imports (configured in tsconfig.json)
- **API responses**: Always check `result.ok` before using `result.data`
- **Error handling**: `safeApi()` returns errors in `result.error` and human-readable message in `result.message`
- **Token management**: Automatic Bearer token injection happens via request interceptor
- **Session expiry**: 401 responses with Authorization header trigger `handleUnauthorizedSession` callback
- **TypeScript strict mode**: Enabled, all types must be explicitly defined

## Debugging Tips

- Check `process.env.NEXT_PUBLIC_API_BASE_URL` is set in `.env.local`
- Use React Query DevTools (if installed) to inspect queries/mutations state
- Check browser Network tab for API responses and Authorization headers
- For auth issues: verify token is stored and retrieved correctly via `getToken()`
- For validation issues: check Zod schema matches API validation rules

## Git Commit History Reference

Recent commits show progression through:
- Category management (CRUD operations)
- Product API integration
- Product UI implementation
- These provide context for feature patterns already established in codebase
