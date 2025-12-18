import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createNewCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin has been successfully added.");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => {
      toast.error("Cabin could not be added", err.message);
    },
  });

  return { isCreating, createNewCabin };
}
