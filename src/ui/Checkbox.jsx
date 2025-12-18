import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: purple;
  }

  & input[type="checkbox"]:disabled {
    filter: grayscale(1) brightness(0.8);
    cursor: not-allowed;
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

function Checkbox({ checked, onChange, disabled = false, id, children }) {

  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
