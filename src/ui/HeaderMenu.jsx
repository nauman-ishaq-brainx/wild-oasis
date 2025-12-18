import styled from "styled-components"
import Logout from "./Logout"
import ButtonIcon from "./ButtonIcon"
import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`



export default function HeaderMenu(){
    const navigate = useNavigate();
    return <StyledHeaderMenu>
        <li>
            <Logout />
        </li>
        <li>
            <ButtonIcon onClick={()=>{navigate('/account')}}>
                <HiOutlineUser />
            </ButtonIcon>

        </li>

    </StyledHeaderMenu>
}