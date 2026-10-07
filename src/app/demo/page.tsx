"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Layers, Users } from "lucide-react";

import { postSchema, type PostFormValues, type ApiPost } from "@/lib/validations/post.schema";
import { getPosts, createPost } from "@/lib/api/posts";
import { usePostStore } from "@/store/usePostStore";
import UserManagement from "@/components/UserManagement";

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${color}`}
    >
      {children}
    </div>
  );
}

function PostCard({
  post,
  isSelected,
  onClick,
}: {
  post: ApiPost;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group ${
        isSelected
          ? "bg-violet-500/20 border-violet-500/60 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                isSelected
                  ? "bg-violet-500/30 text-violet-300"
                  : "bg-white/10 text-slate-400"
              }`}
            >
              #{post.id}
            </span>
          </div>
          <p className="text-sm font-medium text-white capitalize line-clamp-1 group-hover:text-violet-300 transition-colors">
            {post.title}
          </p>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{post.body}</p>
        </div>
        {isSelected && (
          <span className="text-violet-400 text-xs shrink-0 mt-1">✓ Selected</span>
        )}
      </div>
    </button>
  );
}

function SelectedPostPanel({ post, onClear }: { post: ApiPost; onClear: () => void }) {
  return (
    <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/30 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-violet-400 font-semibold uppercase tracking-wider">
          Selected Post
        </span>
        <button
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
        >
          Clear ×
        </button>
      </div>
      <h3 className="text-white font-semibold capitalize mb-2">{post.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{post.body}</p>
      <div className="mt-3 pt-3 border-t border-violet-500/20 flex gap-4 text-xs text-slate-500">
        <span>Post ID: <span className="text-violet-300">#{post.id}</span></span>
        <span>User ID: <span className="text-violet-300">#{post.userId}</span></span>
      </div>
    </div>
  );
}

// ─── Post Form (React Hook Form + Zod) ───────────────────────────────────────

function CreatePostForm() {
  const queryClient = useQueryClient();
  const addCreatedPost = usePostStore((s) => s.addCreatedPost);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", body: "" },
    mode: "onTouched", // validate after the user leaves a field
  });

  const bodyValue = watch("body");

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Add to Zustand session store
      addCreatedPost(newPost);
      // Invalidate the posts list so it refetches in the background
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setSuccessMsg(`Post #${newPost.id} created successfully!`);
      reset();
      setTimeout(() => setSuccessMsg(null), 4000);
    },
  });

  const onSubmit = (data: PostFormValues) => {
    setSuccessMsg(null);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter post title…"
          {...register("title")}
          className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-sm text-white placeholder-slate-500 outline-none transition-all duration-200
            focus:bg-white/[0.08] focus:ring-2 focus:ring-violet-500/40
            ${errors.title
              ? "border-red-500/60 focus:ring-red-500/30"
              : touchedFields.title
              ? "border-emerald-500/50"
              : "border-white/10 hover:border-white/20"
            }
          `}
        />
        {errors.title && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {errors.title.message}
          </p>
        )}
      </div>

      {/* Body Field */}
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-slate-300 mb-2">
          Body
          <span className="ml-2 text-xs text-slate-500 font-normal">
            ({bodyValue?.length ?? 0} / 500)
          </span>
        </label>
        <textarea
          id="body"
          rows={4}
          placeholder="Write your post content…"
          {...register("body")}
          className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-sm text-white placeholder-slate-500 outline-none resize-none transition-all duration-200
            focus:bg-white/[0.08] focus:ring-2 focus:ring-violet-500/40
            ${errors.body
              ? "border-red-500/60 focus:ring-red-500/30"
              : touchedFields.body
              ? "border-emerald-500/50"
              : "border-white/10 hover:border-white/20"
            }
          `}
        />
        {errors.body && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {errors.body.message}
          </p>
        )}
      </div>

      {/* Mutation error */}
      {mutation.isError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
          {(mutation.error as Error).message}
        </div>
      )}

      {/* Success message */}
      {successMsg && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
          <span>✓</span> {successMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || mutation.isPending}
        className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white
          bg-gradient-to-r from-violet-600 to-indigo-600
          hover:from-violet-500 hover:to-indigo-500
          shadow-[0_4px_20px_-4px_rgba(139,92,246,0.5)]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 active:scale-[0.98]"
      >
        {mutation.isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Publishing…
          </span>
        ) : (
          "Publish Post"
        )}
      </button>
    </form>
  );
}

// ─── Session Created Posts ────────────────────────────────────────────────────

function CreatedPostsList() {
  const createdPosts = usePostStore((s) => s.createdPosts);
  if (createdPosts.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
        Created this session ({createdPosts.length})
      </p>
      {createdPosts.map((p, i) => (
        <div
          key={i}
          className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm"
        >
          <span className="text-emerald-400 font-medium capitalize">{p.title}</span>
          <span className="ml-2 text-xs text-slate-500">(simulated — ID #{p.id})</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Demo Page ───────────────────────────────────────────────────────────

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");
  const [page, setPage] = useState(1);

  // TanStack Query — fetches posts, re-fetches when `page` changes
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useQuery<ApiPost[], Error>({
    queryKey: ["posts", page],
    queryFn: () => getPosts(8, page),
    placeholderData: (prev) => prev, // keep old data while fetching next page
  });

  // Zustand state
  const selectedPost = usePostStore((s) => s.selectedPost);
  const setSelectedPost = usePostStore((s) => s.setSelectedPost);
  const clearSelectedPost = usePostStore((s) => s.clearSelectedPost);

  return (
    <div className="relative min-h-screen bg-[#030014] text-[#f8fafc] font-sans antialiased">
      {/* Ambient glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px] pointer-events-none" />

      {/* Header */}
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
            <span className="text-sm text-slate-400">Demo</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/users"
              className="text-sm text-violet-300 hover:text-white transition-colors"
            >
              Users Page →
            </a>
            <a
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            Fullstack Interactive Showcase
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Next.js + Prisma ORM + TanStack Query
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Fullstack demonstration featuring live PostgreSQL database CRUD operations with Prisma ORM
            and client-side state management.
          </p>
        </div>

        {/* Main Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              Users CRUD (Prisma + PostgreSQL)
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "posts"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              Posts Demo (JSONPlaceholder)
            </button>
          </div>
        </div>

        {activeTab === "users" ? (
          <UserManagement />
        ) : (
          <div>
            {/* Library badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { label: "React Hook Form", color: "bg-pink-500/10 border-pink-500/30 text-pink-300" },
                { label: "Zod", color: "bg-blue-500/10 border-blue-500/30 text-blue-300" },
                { label: "Zustand", color: "bg-amber-500/10 border-amber-500/30 text-amber-300" },
                { label: "TanStack Query", color: "bg-red-500/10 border-red-500/30 text-red-300" },
              ].map((b) => (
                <span
                  key={b.label}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${b.color}`}
                >
                  {b.label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Left Column: TanStack Query + Zustand ── */}
          <div className="space-y-6">
            {/* TanStack Query Panel */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <SectionLabel color="bg-red-500/10 border-red-500/30 text-red-300">
                TanStack Query
              </SectionLabel>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Posts from JSONPlaceholder</h2>
                {isFetching && !isLoading && (
                  <span className="text-xs text-cyan-400 animate-pulse">Refetching…</span>
                )}
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
                  ))}
                </div>
              ) : isError ? (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                  Error: {(error as Error).message}
                </div>
              ) : (
                <div className={`space-y-2 transition-opacity ${isPlaceholderData ? "opacity-60" : "opacity-100"}`}>
                  {posts?.map((post: ApiPost) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      isSelected={selectedPost?.id === post.id}
                      onClick={() =>
                        selectedPost?.id === post.id
                          ? clearSelectedPost()
                          : setSelectedPost(post)
                      }
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || isFetching}
                  className="px-4 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>
                <span className="text-xs text-slate-500">
                  Page <span className="text-white font-medium">{page}</span>
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={isFetching || (posts?.length ?? 0) < 8}
                  className="px-4 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Zustand Selected Post Panel */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <SectionLabel color="bg-amber-500/10 border-amber-500/30 text-amber-300">
                Zustand Store
              </SectionLabel>
              <h2 className="text-lg font-semibold text-white mb-4">Global Selection State</h2>
              {selectedPost ? (
                <SelectedPostPanel post={selectedPost} onClear={clearSelectedPost} />
              ) : (
                <div className="p-5 rounded-xl border border-dashed border-white/10 text-center">
                  <p className="text-slate-500 text-sm">
                    No post selected. Click any post above to store it in Zustand state.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column: React Hook Form + Zod ── */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <SectionLabel color="bg-pink-500/10 border-pink-500/30 text-pink-300">
                React Hook Form + Zod
              </SectionLabel>
              <h2 className="text-lg font-semibold text-white mb-1">Create a Post</h2>
              <p className="text-xs text-slate-500 mb-5">
                Validation fires on blur. The mutation calls the JSONPlaceholder API and the result
                is stored in Zustand via <code className="text-violet-300">addCreatedPost</code>.
              </p>
              <CreatePostForm />
              <CreatedPostsList />
            </div>

            {/* How-it-works callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0c26]/80 to-[#080718]/95 border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> How This Page Works
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-red-400 shrink-0">TQ</span>
                  <span>
                    <code className="text-violet-300">useQuery</code> fetches posts with automatic
                    caching, background refetch, and pagination via <code className="text-violet-300">queryKey: [&quot;posts&quot;, page]</code>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400 shrink-0">ZS</span>
                  <span>
                    <code className="text-violet-300">usePostStore</code> holds{" "}
                    <code className="text-violet-300">selectedPost</code> in global memory. Clicking
                    a card calls <code className="text-violet-300">setSelectedPost</code>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400 shrink-0">RHF</span>
                  <span>
                    <code className="text-violet-300">useForm</code> with{" "}
                    <code className="text-violet-300">zodResolver</code> connects the Zod schema to
                    the form. Errors display per-field on blur.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 shrink-0">ZD</span>
                  <span>
                    Zod&apos;s <code className="text-violet-300">postSchema</code> defines rules once and
                    they are shared between form validation and API type inference.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      )}
      </main>
    </div>
  );
}
