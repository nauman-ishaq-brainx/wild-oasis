import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "./SpinnerMini";
import useLogout from "../features/authentication/useLogout";

export default function Logout(){
      const {isPending, logout} = useLogout();
    return <ButtonIcon onClick={logout}>
        
        {!isPending ?<HiArrowRightOnRectangle />: <SpinnerMini />}
    </ButtonIcon>
}