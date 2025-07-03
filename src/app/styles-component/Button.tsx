import { styled } from "styled-components";

export const Button = styled.button<{
    selected: boolean
}>`
width: 100%;
background-color: ${props => {
    console.log(props)
    return props.selected ? 'red' : 'gray';
}};
padding: 10px;
cursor: pointer;
`