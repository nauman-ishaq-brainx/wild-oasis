import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBooking(){
    const [searchParams] = useSearchParams();
    const numDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7
    const lastDate = subDays(new Date(), numDays).toISOString();
    const {data: bookings, isFetching: isBookingLoading} = useQuery({
        queryFn : async()=>{return await getBookingsAfterDate(lastDate)},
        queryKey: ['bookings', `last-${numDays}`]
    })
    return {bookings, isBookingLoading}
}