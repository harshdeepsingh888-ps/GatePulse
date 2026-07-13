import { useMutation } from "@tanstack/react-query";

import { login } from "@/services/auth.service";
import type { LoginRequest } from "@/types/api";

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
  });
}