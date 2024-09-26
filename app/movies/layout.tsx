"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataStoreProvider } from "@/domains/movies/contexts/DataStoreContext";

const queryClient = new QueryClient();

export default function MoviesLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataStoreProvider>{children}</DataStoreProvider>
    </QueryClientProvider>
  );
}
