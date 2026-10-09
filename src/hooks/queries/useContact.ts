import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  projectType?: string;
  budget?: string;
  details: string;
  consent?: boolean;
  honeypot?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  id: string;
}

export function useContactMutation() {
  const queryClient = useQueryClient();

  return useMutation<ContactSubmissionResponse, Error, ContactSubmissionPayload>({
    mutationFn: async (payload: ContactSubmissionPayload) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || "We couldn't send your message. Please try again.");
      }

      return data as ContactSubmissionResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contact.all });
    },
  });
}
