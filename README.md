<h1 align="center">🚀 Boilerplate Next.js</h1>

<p align="center">
  <img src="https://img.shields.io/badge/GitHub-Template-blue" alt="Template" />
  <img src="https://img.shields.io/badge/node-%3E%3D20.x-brightgreen" alt="Node Version" />
  <img src="https://img.shields.io/badge/Next.js-14.x-black" alt="Next.js Version" />
  <img src="https://img.shields.io/badge/TypeScript-v5.x-3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v3.x-06B6D4" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

## Next.js + TypeScript + Tailwind CSS Starter Template

A production-ready Next.js boilerplate featuring shadcn/ui components, TanStack Query, Zustand state management, React Hook Form with Zod validation, and a beautiful glassmorphism UI. This project provides a scalable and maintainable foundation for building modern web applications using Next.js while following best practices for state management, data fetching, form validation, and UI design.

> 💡 This repository is a GitHub Template. Click **Use this template** to create a new project with all configurations and best practices already set up.

---

## ✨ Features

### 🎨 UI & Styling

* Tailwind CSS with custom configuration
* shadcn/ui component library (Radix UI primitives)
* Glassmorphism design system
* Dark-mode-first aesthetics
* Responsive layout out of the box
* Lucide React icons

### 🗃 State Management

* Zustand for global client state
* Minimal boilerplate store setup
* Devtools-friendly

### 📡 Data Fetching

* TanStack Query (React Query) v5
* Query Provider pre-configured
* Devtools included in development

### 📋 Forms & Validation

* React Hook Form integration
* Zod schema validation
* `@hookform/resolvers` for seamless integration

### 🏗 Architecture

* Next.js App Router
* TypeScript strict mode
* Path aliases with `@/` prefix
* Modular folder structure
* Separation of concerns (components, lib, store, providers)

### ⚙️ Developer Experience

* ESLint with Next.js recommended config
* PostCSS & Autoprefixer
* Fast Refresh with Next.js Dev Server
* `class-variance-authority` (CVA) for component variants
* `clsx` + `tailwind-merge` for conditional class names

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── demo/                  # Interactive demo page
│   ├── fonts/                 # Local font files
│   ├── globals.css            # Global styles & Tailwind directives
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing/home page
├── components/
│   ├── ui/                    # shadcn/ui components (Button, Tabs, etc.)
│   ├── DashboardPreview.tsx   # Demo dashboard component
│   └── FeatureCard.tsx        # Reusable feature card component
├── lib/
│   ├── api/
│   │   └── posts.ts           # Example API service layer
│   ├── validations/           # Zod validation schemas
│   └── utils.ts               # Utility functions (cn, etc.)
├── providers/
│   └── QueryProvider.tsx      # TanStack Query provider wrapper
└── store/
    └── usePostStore.ts        # Zustand store example
```

---

## 🛠 Tech Stack

| Category          | Technology                   | Version   |
|-------------------|------------------------------|-----------|
| Framework         | Next.js                      | 14.x      |
| Language          | TypeScript                   | ^5.x      |
| Styling           | Tailwind CSS                 | ^3.4.x    |
| UI Components     | shadcn/ui (Radix UI)         | latest    |
| State Management  | Zustand                      | ^5.0.x    |
| Data Fetching     | TanStack React Query         | ^5.101.x  |
| Form Handling     | React Hook Form              | ^7.81.x   |
| Validation        | Zod                          | ^4.4.x    |
| Icons             | Lucide React                 | ^1.22.x   |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js** >= 20.x
* **npm** >= 10.x (or yarn / pnpm / bun)

### Installation

1. **Clone or use this template:**

   ```bash
   git clone https://github.com/your-username/boilerplate-nextjs.git
   cd boilerplate-nextjs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📜 Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start the development server             |
| `npm run build` | Create an optimized production build     |
| `npm run start` | Start the production server              |
| `npm run lint`  | Run ESLint to check code quality         |

---

## 🧩 Adding shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com). To add more components:

```bash
npx shadcn@latest add <component-name>
# Example:
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add table
```

---

## 📂 Adding a New Feature

Follow this pattern to keep the codebase consistent:

1. **API Layer** — Add service functions in `src/lib/api/`
2. **Validation** — Add Zod schemas in `src/lib/validations/`
3. **Store** — Add Zustand store in `src/store/`
4. **Component** — Add reusable UI in `src/components/`
5. **Page** — Add route page in `src/app/<route-name>/page.tsx`

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is via [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

```bash
npm run build
npm run start
```

---

## 📚 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [TanStack Query Docs](https://tanstack.com/query/latest)
* [Zustand Docs](https://zustand-demo.pmnd.rs/)
* [shadcn/ui Docs](https://ui.shadcn.com)
* [Zod Docs](https://zod.dev)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#).

---

## 📄 License

This project is licensed under the MIT License.
