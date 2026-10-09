import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { chatService } from "@/components/chat/chat.service";
import type { LeadFormData, ChatAssistantResponse } from "@/components/chat/chat.types";

export function useSubmitLeadMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; leadId: string; message: string }, Error, LeadFormData>({
    mutationFn: async (data: LeadFormData) => {
      return chatService.submitLead(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.leads() });
    },
  });
}

export function useSendMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation<ChatAssistantResponse, Error, string>({
    mutationFn: async (text: string) => {
      return chatService.sendMessage(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages() });
    },
  });
}
