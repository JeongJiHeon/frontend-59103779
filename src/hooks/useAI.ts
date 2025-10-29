import { useMutation } from '@tanstack/react-query';
import { aiApi } from '@/lib/api';
import type { AIEventRequest } from '@/types';

export const useAI = () => {
  const createEventFromPromptMutation = useMutation({
    mutationFn: (data: AIEventRequest) => aiApi.createEventFromPrompt(data),
  });

  return {
    createEventFromPrompt: createEventFromPromptMutation.mutate,
    createEventFromPromptAsync: createEventFromPromptMutation.mutateAsync,
    isLoading: createEventFromPromptMutation.isPending,
    error: createEventFromPromptMutation.error,
    data: createEventFromPromptMutation.data,
  };
};
