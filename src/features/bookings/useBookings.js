import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings, getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
const  PAGE_SIZE = 10;
export function useBookings(){

    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    // Filter
    const statusFilter = searchParams.get('status') || 'all';

    //Sort
    const sortFilter = searchParams.get('sortBy') || 'startDate-desc';
    const [sortKey, sortDirection] = sortFilter.split('-');

    const page = Number(searchParams.get('page')) || 1;
    
    const {isPending, error, data} = useQuery({
        queryKey: ['bookings', statusFilter, sortKey, sortDirection, page],
        queryFn: ()=>{return getBookings({field: 'status', value:statusFilter}, {sortKey, sortDirection},page)}
    })

    queryClient.prefetchQuery({
        queryKey: ['bookings', statusFilter, sortKey, sortDirection, page+1 ],
        queryFn: ()=>{return getBookings({field: 'status', value:statusFilter}, {sortKey, sortDirection},page+1)}

    })



    return {isPending, error, data}
}