import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate:singup, isPending} = useMutation({
        mutationFn: signUp,
        onSuccess: ()=>{
            toast.success(
                'User successfully created.'
            )
        },
        onError: ()=>{
            toast.error(
                'User could not be created.'
            )
        }
    })

    return {singup, isPending}
}