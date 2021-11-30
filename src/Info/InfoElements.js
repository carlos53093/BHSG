import styled from 'styled-components'

export const InfoContainer = styled.div`
    color: #fff;
    background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : '#010606')};

    @media screen and (max-width: 480px) {
        margin-top: -100px;
    }
`;

export const InfoWrapper = styled.div`
    display: grid;
    z-index: 1;
    height: 860px;
    width: 100%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center;

    @media screen and (max-width: 768px){
        height: 500px;
`;

export const InfoRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Column1 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col1;
`;

export const Column2 = styled.div`
    margin-bottom: 15 px;
`;

export const TextWrapper = styled.div`
    max-width: 800px;
    display: flex;

    @media screen and (max-width: 560px) {
        display: block;
    }
`;
export const TopLine = styled.p`
    color: white;
    font-size: 40px;
    font-weight: 700;
    max-width: 200px;
    text-transform: uppercase;
    margin-bottom: 16px;
    padding-right: 30px;
    text-align: left;
    text-shadow: 0 0 0.3em hsl(195 50% 50%);
    font-family: 'Saira Extra Condensed', sans-serif;
    font-weight: bold;

    @media screen and (max-width: 640px) {
        font-size: 28px;
        max-width: 300px;
    }

    @media screen and (max-width: 560px) {
        font-size: 28px;
        text-align: center;
        max-width: 500px;
        padding-right: 0px;
    }
`

export const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 16px;
    line-height: 30px;
    color: ${({ darkText }) => (darkText ? '#010606' : '#fff')};
    font-family: 'Saira', sans-serif;
    font-weight: 300;
    text-align: justify;

    @media screen and (max-width: 640px) {
        font-size: 16px;
        max-width: 350px;
    }

    @media screen and (max-width: 480px) {
        font-size: 16px;
        max-width: 500px;
    }
`

export const BtnWrap = styled.div`
    display: flex;
`
export const ImgWrap = styled.div `
    max-width: 900px;
`
export const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;

    @media screen and (max-width: 480px) {
        width: 150%;
        margin-left: -15vw;
    }
`

