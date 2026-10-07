# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-10-07

### Added
- **Fullstack Next.js App Router Architecture**:
  - Next.js 14 App Router setup with strict TypeScript v5 mode.
  - Path alias `@/*` configured for modular import resolution.
  - Root layout (`layout.tsx`) with font optimization and global `QueryProvider`.
  - Landing page with glassmorphism UI design (`src/app/page.tsx`).
  - Interactive demo showcase page with tabbed view (`src/app/demo/page.tsx`).
  - Dedicated User Directory page (`src/app/users/page.tsx`).

- **Prisma ORM 7 & PostgreSQL Database Integration**:
  - Configured `@prisma/client`, `prisma`, and `@prisma/adapter-pg`.
  - Database schema (`prisma/schema.prisma`) with `User` model (`id`, `name`, `email`, `createdAt`, `updatedAt`).
  - Database migration history (`prisma/migrations/`).
  - Prisma 7 configuration file (`prisma7.config.ts`).
  - Prisma client singleton instance (`src/lib/prisma.ts`).

- **Backend RESTful API Route Handlers**:
  - `GET /api/users`: List users with search filtering (`?search=`) and pagination (`?page=`, `?limit=`).
  - `POST /api/users`: Create user with Zod schema validation and duplicate email conflict check (`409 Conflict`).
  - `GET /api/users/[id]`: Fetch single user by ID with error handling (`404 Not Found`, `400 Bad Request`).
  - `PUT /api/users/[id]`: Full update of user with validation and duplicate email check.
  - `PATCH /api/users/[id]`: Partial update of user.
  - `DELETE /api/users/[id]`: Delete user by ID with validation and confirmation response.

- **Backend Service Layer**:
  - Created `src/services/user.service.ts` to decouple business logic and database queries from route handlers.

- **Validation Schemas (Zod)**:
  - Created `src/lib/validations/user.schema.ts` defining `createUserSchema`, `updateUserSchema`, `apiUserSchema`, and inferred TypeScript types.
  - Created `src/lib/validations/post.schema.ts` for demo form validation.

- **Data Fetching & State Management**:
  - Configured TanStack Query v5 with automatic caching, background refetching, and Devtools (`src/providers/QueryProvider.tsx`).
  - Configured Zustand v5 for lightweight global client state (`src/store/usePostStore.ts`).
  - Created typed client-side API helper modules (`src/lib/api/users.ts`, `src/lib/api/posts.ts`).

- **UI & Design System**:
  - Tailwind CSS v3 integration with glassmorphism design tokens.
  - shadcn/ui components (`Button`, `Card`, `Tabs`) built on Radix UI primitives.
  - Lucide React icon library integration.
  - Interactive Fullstack User Management component (`src/components/UserManagement.tsx`) with real-time search, mutation feedback, and modals for Create, Edit, and Delete confirmation.
