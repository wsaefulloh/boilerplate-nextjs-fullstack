import React from "react";
import UserManagement from "@/components/UserManagement";

export const metadata = {
  title: "Users Management | Fullstack Next.js Boilerplate",
  description: "Live CRUD integration with Prisma ORM, PostgreSQL, and TanStack Query.",
};

export default function UsersPage() {
  return (
    <div className="relative min-h-screen bg-[#030014] text-[#f8fafc] font-sans antialiased">
      {/* Ambient background glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-[64px] z-50 bg-[#030014]/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight group">
              <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xs">
                ▲
              </div>
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:to-violet-300 transition-all">
                NextBoilerplate
              </span>
            </a>
            <span className="text-slate-600">/</span>
            <span className="text-sm text-slate-400">Users</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/demo"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Demo Playground
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Fullstack Prisma ORM + TanStack Query CRUD
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Users Management System
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Real database CRUD operations connected to your local PostgreSQL database via Prisma ORM,
            Zod validation schemas, and TanStack Query cache invalidation.
          </p>
        </div>

        {/* Integration Architecture Card */}
        <div className="mb-8 p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-violet-300">Stack:</span>
            <span>Next.js 14 App Router</span>
            <span>•</span>
            <span>PostgreSQL (Prisma ORM)</span>
            <span>•</span>
            <span>TanStack Query</span>
            <span>•</span>
            <span>React Hook Form + Zod</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              GET /api/users
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              POST /api/users
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              PUT /api/users/[id]
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              DELETE /api/users/[id]
            </span>
          </div>
        </div>

        {/* The Live Interactive CRUD UI */}
        <UserManagement />
      </main>
    </div>
  );
}
