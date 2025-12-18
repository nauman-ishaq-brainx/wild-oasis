import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export default function useEditCabin(id){
    const queryClient = useQueryClient()
        const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: (data)=>createEditCabin({...data, id}),
    onSuccess: () => {
      toast.success("Cabin has been successfully edited.");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => {
      toast.error("Cabin could not be edited", err.message);
    },
  });
  return {editCabin, isEditing}
}