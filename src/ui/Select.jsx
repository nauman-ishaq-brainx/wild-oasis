import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? 'red'
        : "green"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;


export default function Select({options, value, onChange}){


  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((option)=>{
        return <option value={option.value} key={option.label}>{option.label}</option>
      })}
    </StyledSelect>
  )
}