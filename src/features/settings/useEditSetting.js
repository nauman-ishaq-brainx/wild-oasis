import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSetting(){
    const queryClient = useQueryClient();
    const {mutate:updateSetting, isPending:isUpdating} = useMutation(
        {mutationFn: updateSettingAPI,
            onSuccess: ()=>{queryClient.invalidateQueries(['setting']); toast.success('Setting updated')},
            onError: ()=>{toast.error('Setting could not be updated.')}
        }
    )


    return {updateSetting, isUpdating}
}