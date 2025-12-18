import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays(){
    const [searchParams] = useSearchParams();
    const numDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7
    const lastDate = subDays(new Date(), numDays).toISOString()
    const {data: stays, isFetching:isStaysLoading} = useQuery({
        queryFn: async()=>{return await getStaysAfterDate(lastDate)},
        queryKey: ['stays', `last-${numDays}`]
    })

    const confirmedStays = stays?.filter(stay=>{ return stay.status !== 'unconfirmed'})
    return {stays, isStaysLoading, confirmedStays, numDays}
}