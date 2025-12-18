import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      navigate("/login");
      queryClient.invalidateQueries({ queryKey: ["user"], refetchType: 'inactive' });
    },
  });

  return { logout, isPending };
}
