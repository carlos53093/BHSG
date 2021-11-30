import styled from 'styled-components'
import {MdArrowForward, MdKeyboardArrowRight} from 'react-icons/md'
import {Link as LinkR} from 'react-router-dom'

export const HeroContainer = styled.div`
    background: #0c0c0c;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 710px;
    position: relative;
    z-index 1;

    @media screen and (min-width: 1920px) {
        height: 1000px;

    @media screen and (max-width: 768px) {
        height: 850px;

    @media screen and (max-width: 600px) {
        height: 500px;
`

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
export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeroH1 = styled.h1`
    color: #fff;
    font-size: 48px;
    text-align: center;
    font-family: 'Saira Extra Condensed', sans-serif;
    font-weight: bold;

    @media screen and (max-width: 768px) {
        font-size: 40px;

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`

export const HeroBtnWrapper = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const ArrowForward = styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;
`

export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    font-size: 20px;
`
export const Image = styled.img`
    max-width: 20%;
`
export const Link = styled(LinkR)`
`