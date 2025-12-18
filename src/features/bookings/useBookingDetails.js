import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBookingDetails(){
    const {bookingId} = useParams();

    const {data: booking, isPending, error} = useQuery({
        queryKey: ['cabin', bookingId],
        queryFn: ()=>{return getBooking(bookingId)}
    })

    return {booking, isPending, error}
}