import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiKeysQueryKey } from "@/features/api-keys/hooks/use-api-keys";
import { regenerateApiKey } from "@/services/api-keys.service";

export function useRegenerateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => regenerateApiKey(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: apiKeysQueryKey,
      });
    },
  });
}
