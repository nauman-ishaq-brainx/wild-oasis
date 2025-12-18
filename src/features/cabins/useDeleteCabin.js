import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin(id){
      const queryClient = useQueryClient();
      const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({
        mutationFn: async()=>{return await deleteCabinAPI(id)},
        onSuccess: () => {
          toast.success("Cabin deleted successfully.");
          queryClient.invalidateQueries({
            queryKey: ["cabin"],
          });
        },
    
        onError: function (error) {
          toast.error("Cabin could not be deleted.");
        },
      });

      return {isDeleting, deleteCabin}
}