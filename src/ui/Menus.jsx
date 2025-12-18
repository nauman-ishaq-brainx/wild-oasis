import { createContext, useContext, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import styled from "styled-components";


const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: #ffffff; /* white instead of var(--color-grey-0) */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow instead of var(--shadow-md) */
border-radius: 8px; /* replace var(--border-radius-md) */

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();


export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [menuPosition, setMenuPosition] = useState({});


  const open = setOpenId;
  const close = () => {
    setOpenId("");
  };

  return (
    <MenuContext.Provider
      value={{ openId, open, close, menuPosition, setMenuPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({id}) {

  const { openId, open, close, setMenuPosition } = useContext(MenuContext);
  function handleClick(e) {

    const rect = e.target.closest('button').getBoundingClientRect()
    if (!openId || openId !== id) {
      open(id);
      setMenuPosition({
        x: window.innerWidth - rect.width - rect.x,
        y:  rect.y + rect.height + 8
      })
    }
    else{
      close()
    }
  }
  return (
    <StyledToggle onClick={(e)=>{handleClick(e)}}>
      <HiOutlineDotsVertical />
    </StyledToggle>
  );
}

function List({id, children}) {

  const { menuPosition, openId } = useContext(MenuContext);
  if (id !== openId) return null;
  return <StyledList position={menuPosition}>{children}</StyledList>;
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handleClick}>
      {icon} {children}
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
