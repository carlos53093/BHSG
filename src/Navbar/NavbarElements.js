import styled from "styled-components";
import {Link as LinkR} from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'
// import {Button} from "@material-ui/core"
// import { styled as muiStyled } from '@material-ui/styles';

export const Nav = styled.nav`
    background: ${({scrollNav}) => (scrollNav ? '#000' : 'transparent')};
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 1024px) {
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    // max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 0px;
    font-weight: bold;
    text-decoration: none;
`;

export const MobileIcon = styled.div `
    display: none;
    @media screen and (max-width: 1024px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 1024px) {
        display:none;
    }
`;

export const NavItem = styled.li`
    height: 80px;
`;

export const NavLinks = styled(LinkR)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 3rem;
    height: 100%;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Saira', sans-serif;
    font-weight: 600;
    text-transform: uppercase;

    &.active {
        border-bottom: 3px solid #FFE81F;
    }
`;

export const NavLinkR = styled('div')`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 3rem;
    height: 100%;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Saira', sans-serif;
    font-weight: 600;
    text-transform: uppercase;

    &.active {
        border-bottom: 3px solid #FFE81F;
    }
`;

export const Image = styled.img`
    max-width: 40%;

    @media screen and (max-width: 1024px) {
        max-width:8%;

    @media screen and (max-width: 768px) {
        max-width:8%;
`

