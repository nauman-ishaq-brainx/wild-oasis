import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSettings(){
    const {data:setting, error, isPending} = useQuery({
        queryKey: ['setting'],
        queryFn: getSettings
    })
    return {setting, error, isPending}
}