import { create } from "zustand";
import type { ApiPost } from "@/lib/validations/post.schema";

/**
 * Shape of the Zustand post store.
 *
 * State:
 *   selectedPost  — The post the user has clicked/selected (null if none).
 *   createdPosts  — List of posts created via the form in the current session.
 *
 * Actions:
 *   setSelectedPost   — Set the currently selected post.
 *   clearSelectedPost — Deselect the current post.
 *   addCreatedPost    — Push a newly created post to the local list.
 */
interface PostStore {
  selectedPost: ApiPost | null;
  createdPosts: ApiPost[];
  setSelectedPost: (post: ApiPost) => void;
  clearSelectedPost: () => void;
  addCreatedPost: (post: ApiPost) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  selectedPost: null,
  createdPosts: [],

  setSelectedPost: (post) => set({ selectedPost: post }),

  clearSelectedPost: () => set({ selectedPost: null }),

  addCreatedPost: (post) =>
    set((state) => ({ createdPosts: [post, ...state.createdPosts] })),
}));
