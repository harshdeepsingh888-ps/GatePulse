import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiKeysQueryKey } from "@/features/api-keys/hooks/use-api-keys";
import { revokeApiKey } from "@/services/api-keys.service";

export function useRevokeApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => revokeApiKey(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: apiKeysQueryKey,
      });
    },
  });
}
