import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export interface ComingSoonPayload {
  email: string;
  serviceName: string;
  consent: boolean;
}

export interface ComingSoonResponse {
  success: boolean;
  message: string;
}

export function useComingSoonMutation() {
  const queryClient = useQueryClient();

  return useMutation<ComingSoonResponse, Error, ComingSoonPayload>({
    mutationFn: async (payload: ComingSoonPayload) => {
      // Simulate real asynchronous network request with latency
      await new Promise((resolve) => setTimeout(resolve, 700));

      if (!payload.email || !payload.email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }

      return {
        success: true,
        message: `You'll be notified when ${payload.serviceName} launches.`,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comingSoon.all });
    },
  });
}
