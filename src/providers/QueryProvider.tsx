"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * QueryProvider
 *
 * Wraps the app with TanStack Query's QueryClientProvider.
 * Must be a Client Component because QueryClient uses browser APIs.
 *
 * The QueryClient is instantiated inside state (not module scope) so that
 * each Next.js request gets its own client — avoids cache sharing between users.
 *
 * ReactQueryDevtools renders only in development and adds the floating
 * TanStack Query inspector panel to the bottom of the screen.
 */
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 60 seconds before a background refetch
            staleTime: 60 * 1000,
            // Keep unused query data in cache for 5 minutes
            gcTime: 5 * 60 * 1000,
            // Retry failed requests once before surfacing the error
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
