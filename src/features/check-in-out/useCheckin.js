import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: checkin, isPending: isCheckingin} = useMutation({
        mutationFn: async ({bookingId, breakfast})=>{return await updateBooking(bookingId, {
            "status": 'checked-in',
            isPaid: true,
            ...breakfast
        },
    
    )},
    onSuccess: (data)=>{

        toast.success(`Cabin #${data.id} has been successfully checked in.`)
        queryClient.invalidateQueries({active:true})
        navigate('/')
    },
    onError: ()=>{
        toast.error(`Cabin  could not be checked in.`)
    }
    })

    return {checkin, isCheckingin}
}