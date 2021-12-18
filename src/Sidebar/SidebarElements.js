import styled from 'styled-components'
import {Link as LinkS} from 'react-scroll'
import {FaTimes} from 'react-icons/fa'


export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 60%;
    background-color: #0d0d0d !important;
    display: grid;
    align-items: center;
    top: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100' : '0%')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`

export const CloseIcon = styled(FaTimes)`
    color:#fff
`

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    color: #fff;
`
export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 80px);
    text-align: center; 

    @media screen and (max-width: 480px);
        grid-template-rows: repeat(8, 60px);
    }
`;


export const SidebarLink = styled(LinkS)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    text-decoration: none;
    list-style: none;
    padding: 10px 0 10px 0;
    transition: 0.2s ease-int-out;
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'Saira', sans-serif;
    font-weight: 600;

    &:hover {
        color #FFE81F;
        transition: 0.2s ease-in-out;
    }
`