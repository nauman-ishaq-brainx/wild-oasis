import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { login as APILogin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async ({ email, password }) => {
      return await APILogin({ email, password });
    },
    onSuccess: (data) => {
        queryClient.setQueryData(['user'], data.user)
      toast.success("Login successful.");
      navigate("/");
    },
    onError: () => {
      toast.error("Invalid credentials");
    },
  });

  return { login, isLoggingIn };
}
