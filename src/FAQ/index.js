import React, { useState } from 'react';  
import { Data } from './Data';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import ParticleBackground from '../ParticleBackground'
import './faq.css';

const HeroBg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`
const HeroContainer = styled.div`
    background: #0c0c0c;
    padding: 0 30px;
    height: 900px;
    position: relative;

  @media screen and (min-width: 1920px) {
      margin-top: 15vw;
      height: 1100px;
      }

  @media screen and (max-width: 768px) {
    height: 1100px;
    margin-top: 5vw;
      }

  @media screen and (max-width: 480px) {
    margin-top: 15vw;
    height: 1350px;
    }
    
`
const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 710px;
  background: #transparent;

  @media screen and (max-width: 768px) {
    height: 950px;
  @media screen and (max-width: 480px) {
    height: 1200px;
    }
`;

const Container = styled.div`
  position: absolute;
  box-shadow: 2px 5px 10px 5px hsl(195 50% 50%);
  width: 80%;
  background: #272727;
`;

const Wrap = styled.div`
  padding: 3% 3% 3% 3%;
  background: black;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
  text-shadow: 0 0 0.2em hsl(195 50% 50%);
  font-family: 'Saira Extra Condensed', sans-serif;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    padding: 5% 5% 5% 5%;}

  @media screen and (max-width: 480px) {
    font-size: 16px;}
`;

const Dropdown = styled.div`
  background: black;
  color: white;
  padding: 5% 5% 5% 5%;
  width: 100%;
  height: 100px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  border-bottom: 1px solid #FFE81F;
  border-top: 1px solid #FFE81F;
  font-family: 'Saira', sans-serif;
  font-weight: 300;
    
  @media screen and (max-width: 768px) {
    height: 160px;
    font-size: 15px;}

  @media screen and (max-width: 640px) {
      font-size: 13px;}
  }

  @media screen and (max-width: 480px) {
    height:150px;
    font-size: 10px;}
}
`;

const Wrap1 = styled.div`
  padding: 3% 3% 3% 3%;
  background: black;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  text-shadow: 0 0 0.2em hsl(195 50% 50%);
  font-family: 'Saira Extra Condensed', sans-serif;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    padding: 5% 5% 5% 5%;}

  @media screen and (max-width: 480px) {
    font-size: 16px;}
`;

const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };


  return (
    <HeroContainer id='faq'>
        <HeroBg>
          <ParticleBackground></ParticleBackground>
          <ParticleBackground></ParticleBackground>
          <ParticleBackground></ParticleBackground>
          <ParticleBackground></ParticleBackground>
          <ParticleBackground></ParticleBackground>
          <ParticleBackground></ParticleBackground>
          <ParticleBackground></ParticleBackground>
        </HeroBg>
    <IconContext.Provider value={{ color: '#FFE81F', size: '25px' }}>
      <AccordionSection>
        <Container>
        <Wrap1>
        <h1>Frequently Asked Questions </h1>
        </Wrap1>
          {Data.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h2>{item.question}</h2>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                    <p>{item.answer}</p>
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
    </HeroContainer>
  );
};

export default Accordion;