<h1 align="center">🚀 Boilerplate Next.js Fullstack</h1>

<p align="center">
  <img src="https://img.shields.io/badge/GitHub-Template-blue" alt="Template" />
  <img src="https://img.shields.io/badge/node-%3E%3D20.x-brightgreen" alt="Node Version" />
  <img src="https://img.shields.io/badge/Next.js-14.x-black" alt="Next.js Version" />
  <img src="https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-v5.x-3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v3.x-06B6D4" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

## Next.js Fullstack Starter Template (Prisma + PostgreSQL + TanStack Query + shadcn/ui)

A production-ready **Next.js Fullstack boilerplate** featuring **Prisma ORM 7**, **PostgreSQL**, RESTful API route handlers, **TanStack Query v5**, **Zustand** state management, **React Hook Form** with **Zod** schema validation, and a sleek dark glassmorphism UI built on **shadcn/ui** and **Tailwind CSS**.

This project provides an end-to-end, scalable architecture covering both backend (database, migrations, service layer, route handlers) and frontend (server state caching, forms, optimistic UI, and design system).

> 💡 This repository is a GitHub Template. Click **Use this template** to create a new project with all backend, database, and frontend configurations pre-configured.

---

## ✨ Features

### 🗄️ Backend & Database
* **Prisma ORM 7** with PostgreSQL adapter (`@prisma/adapter-pg`)
* Automated migrations and schema management (`prisma/schema.prisma`)
* Dedicated **Service Layer** (`src/services/`) for clean business logic separation
* RESTful API Route Handlers in Next.js App Router (`/api/users`, `/api/users/[id]`)
* Strict request validation with **Zod** schemas
* Robust error handling with appropriate HTTP status codes (200, 201, 400, 404, 409, 500)
* Built-in search filtering and pagination support

### 📡 Data Fetching & Caching
* **TanStack Query (React Query) v5** with pre-configured `QueryProvider`
* Automatic server state caching, deduplication, and background refetching
* Mutations (`useMutation`) with instant query cache invalidation
* React Query Devtools enabled for development inspection

### 📋 Forms & Validation
* **React Hook Form v7** for performant, uncontrolled form management
* **Zod v4** schema validation with shared types between frontend and backend
* `@hookform/resolvers` for seamless Zod integration

### 🎨 UI & Styling
* **Tailwind CSS v3** with custom glassmorphism design tokens
* **shadcn/ui** primitives built on accessible Radix UI
* Dark-mode-first aesthetic with smooth gradients and micro-animations
* **Lucide React** icon set
* Full interactive User Management CRUD dashboard with modals for Create, Edit, and Delete confirmation

### 🗃 State Management
* **Zustand v5** for lightweight, boilerplate-free global client-side state

### 🏗 Architecture & Developer Experience
* Next.js 14 App Router (`src/app/`)
* Strict TypeScript v5 configuration
* Path aliases with `@/*` mapping
* Modular separation of concerns (`app/api`, `services`, `lib/api`, `lib/validations`, `components`, `store`)
* ESLint and PostCSS pre-configured

---

## 📁 Project Structure

```text
├── prisma/
│   ├── migrations/            # SQL migration history
│   └── schema.prisma          # Database models (User, etc.)
├── prisma7.config.ts          # Prisma 7 configuration
├── src/
│   ├── app/
│   │   ├── api/               # Backend API Route Handlers
│   │   │   ├── tasks/         # Example tasks API route
│   │   │   └── users/         # Users CRUD API routes
│   │   │       ├── route.ts       # GET (list/search/page), POST (create)
│   │   │       └── [id]/route.ts  # GET, PUT, PATCH, DELETE
│   │   ├── demo/              # Interactive demo showcase (Tabs: Users CRUD & Posts)
│   │   ├── users/             # Dedicated Users Management page
│   │   ├── fonts/             # Local font assets
│   │   ├── globals.css        # Global CSS & Tailwind directives
│   │   ├── layout.tsx         # Root layout with QueryProvider
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (Button, Card, Tabs, etc.)
│   │   ├── DashboardPreview.tsx # Interactive console preview
│   │   ├── FeatureCard.tsx    # Feature showcase cards
│   │   └── UserManagement.tsx # Fullstack CRUD component (Table, Modals, Forms)
│   ├── generated/             # Generated Prisma client artifacts
│   ├── lib/
│   │   ├── api/               # Client-side API fetchers (users.ts, posts.ts)
│   │   ├── validations/       # Zod schemas (user.schema.ts, post.schema.ts)
│   │   ├── prisma.ts          # Prisma client singleton instance
│   │   └── utils.ts           # Utility functions (cn helper)
│   ├── providers/
│   │   └── QueryProvider.tsx  # TanStack Query client & Devtools provider
│   ├── services/
│   │   └── user.service.ts    # Backend business logic & Prisma queries
│   └── store/
│       └── usePostStore.ts    # Zustand client state store
```

---

## 🛠 Tech Stack

| Category          | Technology                   | Version   | Description |
|-------------------|------------------------------|-----------|-------------|
| Framework         | Next.js (App Router)         | 14.2.x    | Fullstack React framework |
| Database & ORM    | Prisma ORM & PostgreSQL      | ^7.10.x   | Type-safe ORM with pg adapter |
| Language          | TypeScript                   | ^5.x      | Strict type checking |
| Styling           | Tailwind CSS                 | ^3.4.x    | Utility-first styling |
| UI Primitives     | shadcn/ui (Radix UI)         | latest    | Accessible UI components |
| Server State      | TanStack React Query         | ^5.101.x  | Data fetching & caching |
| Client State      | Zustand                      | ^5.0.x    | Lightweight state store |
| Form Handling     | React Hook Form              | ^7.81.x   | Form state & validation |
| Schema Validation | Zod                          | ^4.4.x    | Schema declaration & types |
| Icons             | Lucide React                 | ^1.22.x   | Modern icon library |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* **Node.js** >= 20.x (Node 22 LTS recommended)
* **npm** >= 10.x (or pnpm / yarn / bun)
* **PostgreSQL** running locally or a cloud database instance (e.g. Neon, Supabase, Prisma Postgres)

### Installation & Setup

1. **Clone or use this template:**

   ```bash
   git clone https://github.com/your-username/boilerplate-nextjs-fullstack.git
   cd boilerplate-nextjs-fullstack
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory (or update the existing one):

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/nextjs-fullstack"
   ```

4. **Initialize the Database:**

   Run Prisma migrations to apply the schema to your PostgreSQL database:

   ```bash
   npx prisma migrate dev
   ```

   Generate the Prisma Client:

   ```bash
   npx prisma generate
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser:
   * **Home:** [http://localhost:3000](http://localhost:3000)
   * **Users CRUD Management:** [http://localhost:3000/users](http://localhost:3000/users)
   * **Interactive Demo:** [http://localhost:3000/demo](http://localhost:3000/demo)

---

## 📡 API Endpoints (Users CRUD)

| Method | Endpoint | Description | Query / Body | Response Status |
|--------|----------|-------------|--------------|-----------------|
| `GET` | `/api/users` | List users | `?search=john&page=1&limit=10` | `200 OK` |
| `POST` | `/api/users` | Create a new user | `{ "name": "string", "email": "string" }` | `201 Created` / `400` / `409` |
| `GET` | `/api/users/:id` | Get user by ID | URL parameter `:id` | `200 OK` / `404 Not Found` |
| `PUT` | `/api/users/:id` | Update user | `{ "name"?: "string", "email"?: "string" }` | `200 OK` / `400` / `404` / `409` |
| `PATCH` | `/api/users/:id` | Partial update | `{ "name"?: "string", "email"?: "string" }` | `200 OK` / `400` / `404` / `409` |
| `DELETE` | `/api/users/:id` | Delete user | URL parameter `:id` | `200 OK` / `404 Not Found` |

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint code quality checks |
| `npx prisma migrate dev` | Applies database migrations in development |
| `npx prisma generate` | Regenerates Prisma Client types |
| `npx prisma studio` | Opens the visual Prisma database GUI in browser |

---

## 🧩 Adding shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com). To add components:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add table
```

---

## 📂 Architecture Pattern (Adding New Entities)

Follow this end-to-end pattern to keep your fullstack code clean and maintainable:

1. **Prisma Schema** — Define model in `prisma/schema.prisma` and run `npx prisma migrate dev`.
2. **Validation Schema** — Define Zod input schemas in `src/lib/validations/<entity>.schema.ts`.
3. **Backend Service** — Create business logic & DB queries in `src/services/<entity>.service.ts`.
4. **API Route Handlers** — Add Next.js endpoints in `src/app/api/<entity>/route.ts`.
5. **Client API Fetcher** — Create client fetch functions in `src/lib/api/<entity>.ts`.
6. **Frontend UI Component** — Build interactive UI with TanStack Query in `src/components/`.
7. **Page Route** — Create page in `src/app/<entity>/page.tsx`.

---

## 🌐 Deployment

### Deploy on Vercel

1. Push your repository to GitHub.
2. Import project in [Vercel](https://vercel.com).
3. Add the `DATABASE_URL` environment variable (e.g. from Neon, Supabase, or Prisma Postgres).
4. Deploy!

### Manual Production Deployment

```bash
npm run build
npm run start
```

---

## 📄 License

This project is licensed under the MIT License.
