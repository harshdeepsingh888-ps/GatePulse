import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiKeysQueryKey } from "@/features/api-keys/hooks/use-api-keys";
import {
  createApiKey,
  type CreateApiKeyRequest,
} from "@/services/api-keys.service";

export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateApiKeyRequest) =>
      createApiKey(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: apiKeysQueryKey,
      });
    },
  });
}
