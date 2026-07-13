import { useQuery } from "@tanstack/react-query";

import { getApiKeys } from "@/services/api-keys.service";

export const apiKeysQueryKey = ["api-keys"] as const;

export function useApiKeys() {
  return useQuery({
    queryKey: apiKeysQueryKey,
    queryFn: getApiKeys,
  });
}
