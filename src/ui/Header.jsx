import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
    background-color: white;
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    display: flex;
    align-items: center;
    justify-content: space-between;
`


export default function Header(){
return (
    <>
    <StyledHeader>
        <UserAvatar />
        <HeaderMenu />
        
    </StyledHeader>
    </>
)
}