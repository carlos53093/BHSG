import styled from 'styled-components';

export const FooterContainer = styled.footer`
    background-color: black;
    align-items: center;
    justify-content: center;
`

export const FooterWrap = styled.div`
    padding: 48px 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margins: 0 auto;
`

export const FooterLinksContainer = styled.div`
    position: relative;
    align-items: center;
    justify-content: center;    

    @media screen and (max-width: 768px){
        padding-top: 32px;
    }
`

export const FooterLinksWrapper = styled.div`
    display: flex;
    margin-left: 20vw;

    @media screen and (min-width: 1920px){
        margin-left: 40vw;
    }
    @media screen and (max-width: 1240px){
        margin-left: 0;
    }
    @media screen and (max-width: 640px){
        flex-direction: column;
    }
`

export const FooterLinkItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    width: 300px;
    box-sizing: border-box;
    color: white;

    @media screen and (max-width: 420px){
        margin: 0;
        padding: 10px;
        width: 100%
    }
`

export const FooterLink = styled.a`
    color: white;
    text-decoration: none;
    margin-bottom: 0.5 rem;
    font-size: 12px;
    font-family: 'Saira', sans-serif;
    font-weight: 600;

    &:hover {
        color: #FFE81F;
        transition: 0.3s ease-out;
    }
`

export const Icons = styled.div`
    flex-direction: row;
    justify-content: center;
`

export const WebsiteRights = styled.small`
    color: white;
    font-size: 16px;
    margin-bottom: 16px;
    white-space: nowrap;
    font-family: 'Saira Extra Condensed', sans-serif;
    font-weight: 300;
`