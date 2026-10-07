"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Users,
  UserPlus,
  Pencil,
  Trash2,
  Search,
  RefreshCw,
  Mail,
  Calendar,
  AlertTriangle,
  Loader2,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import {
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type ApiUser,
} from "@/lib/validations/user.schema";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/users";
import { Button } from "@/components/ui/button";

// ─── Modal Shell ─────────────────────────────────────────────────────────────

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-[#0b081e] border border-violet-500/30 p-6 shadow-2xl shadow-violet-950/50 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

// ─── Main UserManagement Component ──────────────────────────────────────────

export default function UserManagement() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ApiUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<ApiUser | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // ─── TanStack Query: Fetch Users ───
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<ApiUser[], Error>({
    queryKey: ["users", search],
    queryFn: () => getUsers({ search: search.trim() || undefined }),
  });

  // ─── Mutations ───
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsCreateOpen(false);
      showFeedback("success", `User "${newUser.name}" successfully created!`);
    },
    onError: (err: Error) => {
      showFeedback("error", err.message || "Failed to create user");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserInput }) => updateUser(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditingUser(null);
      showFeedback("success", `User "${updated.name}" successfully updated!`);
    },
    onError: (err: Error) => {
      showFeedback("error", err.message || "Failed to update user");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDeletingUser(null);
      showFeedback("success", `User #${id} successfully deleted!`);
    },
    onError: (err: Error) => {
      showFeedback("error", err.message || "Failed to delete user");
    },
  });

  // ─── Forms ───
  const createForm = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: "", email: "" },
  });

  const editForm = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    values: editingUser ? { name: editingUser.name, email: editingUser.email } : undefined,
  });

  const handleOpenEdit = (user: ApiUser) => {
    setEditingUser(user);
    editForm.reset({ name: user.name, email: user.email });
  };

  const handleCreateSubmit = (data: CreateUserInput) => {
    createMutation.mutate(data, {
      onSuccess: () => createForm.reset(),
    });
  };

  const handleEditSubmit = (data: UpdateUserInput) => {
    if (!editingUser) return;
    updateMutation.mutate({ id: editingUser.id, data });
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Feedback Notification */}
      {feedback && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border text-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
          )}
          <span className="flex-1 font-medium">{feedback.message}</span>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs opacity-70 hover:opacity-100 px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#08051a]/80 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              User Directory
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {users.length} {users.length === 1 ? "user" : "users"}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Prisma ORM • PostgreSQL • TanStack Query</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
            title="Refresh Users"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin text-violet-400" : ""}`} />
          </Button>

          {/* Add User Button */}
          <Button
            size="sm"
            onClick={() => setIsCreateOpen(true)}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_4px_16px_rgba(139,92,246,0.3)]"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Create User
          </Button>
        </div>
      </div>

      {/* Users Display Grid / List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-white/5 rounded w-full pt-2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 mx-auto text-rose-400" />
          <h3 className="text-base font-semibold text-rose-300">Failed to load users</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {error?.message || "Ensure your database server is running and Prisma migrations are applied."}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            className="border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
          >
            Retry Fetch
          </Button>
        </div>
      ) : users.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#08051a]/40 border border-white/5 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No Users Found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
              {search
                ? `No user matched "${search}". Try another search term.`
                : "Your Prisma database has no users yet. Click below to create your first user!"}
            </p>
          </div>
          {!search && (
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create First User
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => {
            const initials = user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "U";

            const formattedDate = user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "-";

            return (
              <div
                key={user.id}
                className="group relative p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-violet-500/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-400 text-white font-bold text-sm flex items-center justify-center shadow-md">
                        {initials}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors">
                          {user.name}
                        </h4>
                        <span className="text-xs font-mono text-slate-500">ID #{user.id}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors"
                        title="Edit User"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingUser(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 text-xs text-slate-400 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate text-slate-300 font-mono">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Joined {formattedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Modal 1: Create User ─── */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New User"
        description="Insert a new record into PostgreSQL User table via Prisma."
      >
        <form onSubmit={createForm.handleSubmit(handleCreateSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Budi Santoso"
              {...createForm.register("name")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            {createForm.formState.errors.name && (
              <p className="text-xs text-rose-400 mt-1">
                {createForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="e.g. budi@example.com"
              {...createForm.register("email")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            {createForm.formState.errors.email && (
              <p className="text-xs text-rose-400 mt-1">
                {createForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {createMutation.isError && (
            <p className="text-xs text-rose-400 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              {createMutation.error?.message || "Failed to create user."}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsCreateOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white min-w-[110px]"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                "Save User"
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ─── Modal 2: Edit User ─── */}
      <Modal
        isOpen={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        title="Update User"
        description={editingUser ? `Editing user #${editingUser.id} (${editingUser.name})` : ""}
      >
        <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              {...editForm.register("name")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            {editForm.formState.errors.name && (
              <p className="text-xs text-rose-400 mt-1">
                {editForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              {...editForm.register("email")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            {editForm.formState.errors.email && (
              <p className="text-xs text-rose-400 mt-1">
                {editForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {updateMutation.isError && (
            <p className="text-xs text-rose-400 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              {updateMutation.error?.message || "Failed to update user."}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditingUser(null)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white min-w-[120px]"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ─── Modal 3: Delete Confirmation ─── */}
      <Modal
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        title="Delete User"
      >
        <div className="space-y-4 mt-2">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-300">
              Are you sure you want to permanently delete user{" "}
              <strong className="text-white font-semibold">{deletingUser?.name}</strong> (
              <span className="text-rose-300 font-mono text-xs">{deletingUser?.email}</span>)?
              <p className="text-xs text-slate-400 mt-1">This action cannot be undone.</p>
            </div>
          </div>

          {deleteMutation.isError && (
            <p className="text-xs text-rose-400 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              {deleteMutation.error?.message || "Failed to delete user."}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setDeletingUser(null)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => deletingUser && deleteMutation.mutate(deletingUser.id)}
              className="bg-rose-600 hover:bg-rose-500 text-white min-w-[110px]"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
