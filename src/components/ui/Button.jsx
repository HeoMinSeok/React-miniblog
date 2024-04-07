import styled from "styled-components";

const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
    color: ${(props) => props.color || "white"};
    background-color: ${(props) => props.backgroundColor || "#007bff"};
    border: ${(props) =>
        props.borderStyle
            ? `${props.borderStyle} ${props.borderColor || "white"}`
            : "1px none white"};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 수직, 수평으로 2px씩 그림자, 흐린 정도 0.2 */

    transition: box-shadow 0.3s ease-in-out;
    &:hover {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 15);
    }
    margin-right: 5px;
`;
const Button = (props) => {
    const { title, onClick, backgroundColor, color, borderStyle, borderColor } =
        props;

    return (
        <StyledButton
            onClick={onClick}
            backgroundColor={backgroundColor}
            color={color}
            borderStyle={borderStyle}
            borderColor={borderColor}
        >
            {title || "button"}
        </StyledButton>
    );
};

export default Button;
