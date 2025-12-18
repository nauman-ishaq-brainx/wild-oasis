import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser(){
    const queryClient = useQueryClient();

    const {mutate:updateUser, isPending} = useMutation({
        mutationFn: updateUserAPI,
        onSuccess: ({user})=>{
            toast.success('User has been successfully updated.')
            queryClient.setQueryData(['user'], user)
        },
        onError: ()=>{
            toast.error('There was an error updating the user.')
        }
        
    }
    )


    return {updateUser, isPending}
}