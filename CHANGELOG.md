# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-07-15
### Added
- Initial Next.js boilerplate setup using `create-next-app`
- TypeScript configuration with strict mode
- Tailwind CSS integration with custom `tailwind.config.js`
- PostCSS and Autoprefixer setup
- ESLint with Next.js recommended configuration
- Next.js App Router structure (`src/app/`)
- Global styles (`globals.css`) with Tailwind directives
- Root layout (`layout.tsx`) with font optimization
- shadcn/ui integration (`components.json`) with Radix UI primitives
  - `Button` component (with variants via `class-variance-authority`)
  - `Tabs` component (`@radix-ui/react-tabs`)
- Zustand v5 for global client state management (`src/store/usePostStore.ts`)
- TanStack Query v5 (React Query) for server state and data fetching
  - `QueryProvider` wrapper (`src/providers/QueryProvider.tsx`)
  - TanStack Query Devtools included in development
- React Hook Form v7 with Zod v4 validation
  - `@hookform/resolvers` for schema integration
  - Validation schemas directory (`src/lib/validations/`)
- API service layer example (`src/lib/api/posts.ts`)
- Utility functions with `clsx` and `tailwind-merge` (`src/lib/utils.ts`)
- Lucide React icons
- `FeatureCard` reusable component (`src/components/FeatureCard.tsx`)
- `DashboardPreview` interactive component (`src/components/DashboardPreview.tsx`)
- Landing page with glassmorphism design (`src/app/page.tsx`)
- Interactive demo page (`src/app/demo/`)
- Path alias `@/` pointing to `src/`
