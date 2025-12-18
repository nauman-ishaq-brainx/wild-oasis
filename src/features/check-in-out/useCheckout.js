import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout(){
    const queryClient = useQueryClient();
    const {mutate:checkout, isPending:isCheckingOut} = useMutation({
        mutationFn: async(id)=>{return await updateBooking(id, {
            status: 'checked-out'
        })},
        onSuccess: (data)=>{
            toast.success(`Cabin #${data.id} has been successfuly checkout out.`)
            queryClient.invalidateQueries({active:true})

        },
        onError: (data)=>{
            toast.error(`Cabin #${data.id} could not be checkout out.`)
        }
    })



    return {checkout, isCheckingOut}
}