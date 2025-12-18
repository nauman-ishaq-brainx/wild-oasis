import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteCurrentBooking } from "../../services/apiBookings";

export function useDeleteBooking(){
    const queryClient = useQueryClient();
    const {mutate:deleteBooking, isPending:isDeleting} = useMutation({
        mutationFn: async(id)=>{return await deleteCurrentBooking(id)},
        onSuccess: ()=>{
            toast.success('Booking has been successfuly deleted')
            queryClient.invalidateQueries({active:true})

        },
        onError: ()=>{
            toast.error('Booking could not be deleted')
        }
    }
    )

    return {deleteBooking, isDeleting}
}