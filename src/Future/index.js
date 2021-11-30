import React, {useEffect} from 'react'
import "aos/dist/aos.css";
import Aos from "aos";
import styled from 'styled-components'
import { ImgWrap, InfoContainer, InfoRow, InfoWrapper, Column1, Column2, 
    TextWrapper, TopLine, Subtitle, Img} from './FutureElements'
import ParticleBackground from '../ParticleBackground'


export const HeroBg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`
export const HeroContainer = styled.div`
    background: #0c0c0c;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index 1;
    
    @media screen and (max-width: 480px) {
        height: 900px;
    }
`

const Info = ({lightBg, id, imgStart, headline, darkText, description, img, alt}) => {
    useEffect(() => {
        Aos.init({ duration: 2000});
    },[]);

    return (
        <>
            <InfoContainer lightBg={lightBg} id='future'>
            <HeroContainer>
                <HeroBg>
                    <ParticleBackground></ParticleBackground>
                    <ParticleBackground></ParticleBackground>
                    <ParticleBackground></ParticleBackground>
                    <ParticleBackground></ParticleBackground>
                    <ParticleBackground></ParticleBackground>
                </HeroBg>
                <InfoWrapper data-aos="fade-up">
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <ImgWrap>
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column1>
                        <Column2>
                            <TextWrapper>
                                <TopLine>{headline}</TopLine>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                            </TextWrapper> 
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </HeroContainer>
            </InfoContainer>
        </>
    )
}

export default Info
