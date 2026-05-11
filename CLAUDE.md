# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

**Cozy Bakes Inc Admin** — Next.js 16 admin dashboard for bakery operations. Covers authentication, dashboard analytics, products, categories, orders, customers, reviews, reports, settings, and contact form management.

## Tech Stack

- **Framework**: Next.js 16.1.6, App Router, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui, Radix UI
- **Data Fetching**: TanStack React Query 5.96.2, Axios 1.13.6
- **Forms**: React Hook Form 7.71.2 + Zod 4.3.6
- **UI**: Lucide React, Framer Motion, Input OTP, react-day-picker, Swiper
- **Package Manager**: pnpm

## Quick Start

```bash
pnpm install   # install deps
pnpm dev       # localhost:3000
pnpm build     # production build
pnpm lint      # run linter
```

## Project Structure

```
src/
├── app/              # App Router pages — (auth)/ and (main)/
├── components/
│   ├── auth/         # Auth UI components
│   ├── main/         # Feature UI components (dashboard, orders, products, etc.)
│   └── ui/           # Reusable UI primitives (shadcn/ui)
├── services/
│   ├── queries/      # Plain async GET API functions (no hooks)
│   ├── mutations/    # Plain async create/update/delete API functions (no hooks)
│   └── index.ts      # Axios instance, safeApi, baseAPI
├── hooks/
│   └── api/          # React Query hooks wrapping services/queries/
├── lib/utils/        # Helpers, auth utilities, query config
├── types/            # TypeScript types
├── interfaces/       # Interface definitions (pagination, image, etc.)
├── schemas/          # Zod validation schemas
├── constants/        # App constants
├── data/             # Static/mock data
├── layout/           # Layout wrapper components
└── provider/         # React context providers
```

## API Architecture

### Centralized API Layer (`src/services/index.ts`)

- `baseAPI()` — for GET requests. Returns `ApiResult<T, E>`.
- `safeApi()` — for mutations (POST/PUT/PATCH/DELETE). Returns `ApiResult<T, E>`.
- **Always check `result.ok` before using `result.data`.**
- Bearer token injected automatically via request interceptor.
- 401 with Authorization header triggers `handleUnauthorizedSession` (logout).
- Base URL: `process.env.NEXT_PUBLIC_API_BASE_URL`

### services/queries — Plain GET Functions

No React Query hooks. Plain async functions that call `baseAPI()`.

```typescript
// src/services/queries/categories.ts
export const subCategoriesListAPI = async (page: number, search?: string) => {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  params.append("page", String(page));
  return await baseAPI<SubCategoryListResponse>("GET", `/sub-category/list?${params}`);
};
```

### services/mutations — Plain Mutation Functions

No React Query hooks. Plain async functions that call `safeApi()`.

```typescript
// src/services/mutations/categories.ts
"use server";
export const createSubCategoryAPI = async (payload: FormData) =>
  await safeApi("POST", "/sub-category/create", payload, { isForm: true });

export const deleteSubCategoryAPI = async (slug: string) =>
  await safeApi("POST", `/sub-category/${slug}/delete`);
```

### hooks/api — React Query Hooks

Hooks wrap query API functions from `src/services/queries/`. Use `useCustomQuery` and `useCustomInfiniteQuery`.

```typescript
// src/hooks/api/categories.ts
export function useSubCategoriesList(search?: string) {
  return useCustomInfiniteQuery(
    ["sub-categories", search],
    async ({ pageParam = 1 }) => subCategoriesListAPI(pageParam, search),
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const p = lastPage?.data;
        if (!p || !p.next_page_url || p.current_page >= p.last_page) return undefined;
        return p.current_page + 1;
      },
    },
  );
}
```

### Mutation Pattern in Components

**Do not use `useMutation` by default.** Call mutation API functions directly and manage state manually.

```typescript
async function handleDeleteCategory() {
  if (!slug || isDeleting) return;
  setIsDeleting(true);
  const result = await deleteSubCategoryAPI(slug);
  setIsDeleting(false);

  if (result?.ok) {
    toast.success(result.message || "Category deleted successfully");
    await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
    await queryClient.invalidateQueries({ queryKey: ["sub-category", slug] });
    await onDeleted?.();
    return;
  }
  toast.error(result?.message || "Failed to delete category");
}
```

After a successful mutation: show success toast, invalidate related query keys, close dialogs or run callbacks.  
After a failed mutation: show error toast using `result?.message`.  
Only use `useMutation` if explicitly requested.

## Naming Conventions

| Target | Convention | Examples |
|--------|-----------|---------|
| Files and folders | kebab-case | `category-card.tsx`, `delete-category-dialog.tsx` |
| React components | PascalCase | `CategoryCard`, `DeleteCategoryDialog` |
| Variables and functions | camelCase | `categorySlug`, `handleDeleteCategory` |
| Hooks | camelCase, starts with `use` | `useSubCategoriesList`, `useCustomQuery` |
| Constants | UPPER_CASE | `PAGE_SIZE`, `DEFAULT_ERROR_MESSAGE` |

Hook files are kebab-case; hook functions are camelCase — e.g., file `use-custom-query.ts`, function `useCustomQuery`.

## Code Rules

### Component Size
Single component files must not exceed **150 lines**. If larger: split into smaller components, extract logic into a custom hook, move static data to `data/` or `constants/`, move types to `interfaces/` or `types/`.

### Performance
- No unnecessary state duplication.
- Use `useMemo` for expensive derived values; avoid heavy calculations in JSX.
- Use `useCallback` for handlers passed to memoized children or list items.
- Use stable React Query keys — no inline array/object creation as keys.
- Rely on React Query caching; avoid redundant API calls.

### Navigation
Use `next/link` for all static internal navigation.

```tsx
import Link from "next/link";
<Link href="/products">Products</Link>
```

Use `router.push()` only after actions: successful login, form submit, create/update/delete, or conditional redirects.

### Styling
- Tailwind CSS inline classes are the primary approach.
- Use `.module.css` only for complex isolated styles.
- UI primitives (dialog, scroll-area, etc.) live in `src/components/ui/`.

### TypeScript
- Strict mode is enabled — all types must be explicitly defined.
- Use path alias `@/` for all imports (`@/*` → `src/*`).

## Common Development Tasks

**New page**: Create `src/app/(main)/[feature]/page.tsx`, build UI in `src/components/main/[feature]/`, fetch data via hooks from `src/hooks/api/`.

**New API integration**:
1. GET functions → `src/services/queries/[feature].ts`
2. Mutation functions → `src/services/mutations/[feature].ts`
3. React Query hooks (if needed) → `src/hooks/api/[feature].ts`
4. Call mutation functions directly in components; always check `result.ok`; invalidate query keys on success.

**Form validation**: Create Zod schema in `src/schemas/[section]/[form].ts`, wire with `resolver: zodResolver(schema)` in `useForm`, display errors from `formState.errors`.

## Key Files

| File | Purpose |
|------|---------|
| `src/services/index.ts` | Axios instance, `safeApi`, `baseAPI`, unauthorized handler |
| `src/provider/query.tsx` | `QueryClientProvider` + unauthorized session handler |
| `src/lib/utils/query.ts` | React Query defaults (retry, staleTime) |
| `src/types/axios.ts` | `ApiResult<T, E>` and error response types |
| `next.config.ts` | Image remote patterns, server action body limit |
| `tsconfig.json` | Path alias `@/*` → `src/*` |

## Environment & Debugging

**Required** in `.env.local`: `NEXT_PUBLIC_API_BASE_URL`

- Check that env var is set if API calls fail.
- Use React Query DevTools to inspect query/mutation state.
- Check Network tab for API responses and Authorization headers.
- For auth issues: verify `getToken()` returns a valid token.
- For validation issues: verify Zod schema matches API validation rules.
- `safeApi()` puts the error in `result.error` and a readable message in `result.message`.
