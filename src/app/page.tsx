import React from "react";
import FeatureCard from "@/components/FeatureCard";
import DashboardPreview from "@/components/DashboardPreview";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030014] text-[#f8fafc] font-sans antialiased overflow-hidden selection:bg-violet-500/30 selection:text-white">
      {/* Background ambient glows */}
      <div className="ambient-glow-1"></div>

      {/* Sticky Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-[72px] z-50 bg-[#030014]/60 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">▲</div>
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">NextBoilerplate</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-slate-400 hover:text-white hidden sm:inline-flex" asChild>
              <a href="#features">Features</a>
            </Button>
            <Button variant="ghost" className="text-violet-300 hover:text-white hidden md:inline-flex" asChild>
              <a href="/users">Users CRUD (Prisma)</a>
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
              <a href="/demo">Interactive Demo</a>
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_4px_20px_-2px_rgba(139,92,246,0.4)] border border-white/10" asChild>
              <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-[152px] pb-[120px] px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[#a78bfa] text-xs font-semibold mb-6 pulse-border-animation">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            Next.js 14 • Tailwind • shadcn/ui • Zustand • TanStack Query
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-[900px] mb-6">
            Build your next idea in <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">hours</span>, not weeks.
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-[600px] mb-10 leading-relaxed">A premium, high-performance boilerplate template configured with TypeScript, Tailwind CSS, shadcn/ui primitives, and state-of-the-art glassmorphism.</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_6px_24px_rgba(139,92,246,0.5)] px-8 border border-white/15" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                Use This Template
                <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
              <a href="#preview">Explore Console</a>
            </Button>
          </div>

          {/* Interactive Console Preview */}
          <div id="preview" className="w-full scroll-mt-[100px]">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 border-t border-white/10 bg-[#02000f]/40 scroll-mt-[80px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6">Architectural Blueprint</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Engineered for Scale</h2>
            <p className="text-slate-400 max-w-[550px] leading-relaxed">Everything you need to ship production-ready applications with beautiful components, modular styling, and strict type safety.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Tailwind CSS v3"
              description="Rapid prototyping with utility classes. Clean typography, layouts, colors, and responsive structures built inline."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              }
            />

            <FeatureCard
              title="shadcn/ui Primitives"
              description="Accessible, beautifully styled components built on Radix UI. Copy-paste components directly into your codebase."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              }
            />

            <FeatureCard
              title="TypeScript & Next 14"
              description="Compile-time type safety, Next.js App Router, layout rendering, and optimized production bundle compilation."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
              }
            />

            <FeatureCard
              title="Glassmorphic Aesthetics"
              description="Predefined backdrop-filters, radial gradients, glowing indicators, custom animations, and a rich dark mode."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                </svg>
              }
            />

            <FeatureCard
              title="SEO Optimized"
              description="Preconfigured layout metadatas, semantic markup structure, fast core web vitals, and image optimizations."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              }
            />

            <FeatureCard
              title="Developer Ergonomics"
              description="Preconfigured ESLint rules, absolute tsconfig import paths, and a clean codebase built to scale immediately."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              }
            />

            <FeatureCard
              title="Forms, State & Data"
              description="React Hook Form + Zod for type-safe validation, Zustand for lightweight global state, TanStack Query for server-state caching and background refetch."
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                  <path d="M12 8v4l3 3" />
                </svg>
              }
            />
          </div>

          {/* CTA Banner inside Features Section */}
          <div className="mt-20 p-10 sm:p-14 rounded-3xl text-center relative overflow-hidden bg-gradient-to-br from-[#0f0c26]/80 to-[#080718]/95 border border-white/10 before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[300px] before:h-[150px] before:bg-violet-500/15 before:filter before:blur-3xl before:pointer-events-none">
            <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Ready to build your next SaaS?</h3>
            <p className="text-slate-400 text-base max-w-[500px] mx-auto mb-8 leading-relaxed">Launch your local development environment in seconds and start prototyping immediately with Next.js 14.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_4px_20px_-2px_rgba(139,92,246,0.4)] px-6" asChild>
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                  Explore Documentation
                </a>
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
                <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                  Deploy to Vercel
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16 px-6 border-t border-white/10 bg-[#02000c] text-sm text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 font-bold text-lg tracking-tight mb-4">
                <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-md flex items-center justify-center text-white font-bold text-xs">▲</div>
                <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">NextBoilerplate</span>
              </div>
              <p className="text-xs text-slate-500 max-w-[250px] leading-relaxed">High-performance developer template engineered with modern web standards and design principles.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Product</h4>
              <div className="flex flex-col gap-3">
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
                <a href="#preview" className="hover:text-white transition-colors">
                  Live Console
                </a>
                <a href="https://github.com" className="hover:text-white transition-colors">
                  Repository
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Frameworks</h4>
              <div className="flex flex-col gap-3">
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Next.js 14
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  React 18
                </a>
                <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Tailwind CSS
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Resources</h4>
              <div className="flex flex-col gap-3">
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Documentation
                </a>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Vercel Hosting
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-slate-500">
            <span className="mb-4 md:mb-0">© {new Date().getFullYear()} NextBoilerplate. All rights reserved. Built with Tailwind CSS and shadcn/ui.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
