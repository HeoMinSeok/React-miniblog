import styled from "styled-components";

const StyledTextarea = styled.textarea`
    width: calc(100% - 32px);
    ${(props) => props.height && `height: ${props.height}px;`}
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
    border-color: rgb(37, 147, 255);
    border-radius: 10px;
`;

const TextInput = (props) => {
    const { height, value, onChange, placeholder } = props;

    return <StyledTextarea height={height} value={value} onChange={onChange} placeholder={placeholder || ""}/>;
};

export default TextInput;
