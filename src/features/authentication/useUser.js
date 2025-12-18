import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser(){
    const {data, isFetching} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
    })

    return {isFetching, data}
}