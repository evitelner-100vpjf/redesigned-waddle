import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useHello() {
  return useQuery({
    queryKey: [api.hello.get.path],
    queryFn: async () => {
      const res = await fetch(api.hello.get.path, { credentials: "omit" });
      if (!res.ok) {
        throw new Error("Failed to fetch greeting");
      }
      const data = await res.json();
      
      // Parse with logging to catch schema mismatches easily
      const result = api.hello.get.responses[200].safeParse(data);
      if (!result.success) {
        console.error("[Zod] hello validation failed:", result.error.format());
        throw new Error("Invalid response format");
      }
      
      return result.data;
    },
    // Adding a slight artificial delay in development to appreciate the loading state
    // In a real app this might be removed, but for a minimal hello world it adds polish
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
