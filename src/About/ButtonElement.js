import styled from 'styled-components'

export const Button = styled.a`
    border-radius: 50px;
    background: ${({primary}) => (primary ? '#FFE81F' : '#010606')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    margin-left: 10px;
    margin-right: 10px;
    color: ${({dark}) => (dark ? '#010606' : '#fff')};
    font-size: ${({fontBig}) => (fontBig ? '16px' : '12px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    font-family: 'Saira', sans-serif;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? '#fff' : '#FFE81F')};
    }
`;