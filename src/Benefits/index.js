import { useState } from "react";
import React from 'react';
import styled from "styled-components";
import ParticleBackground from '../ParticleBackground';
import "./Tabs.css";

export const HeroBg = styled.div`
    position: absolute;
    background: black;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`
export const HeroContainer = styled.div`
    background: black;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 710px;
    position: relative;
    z-index 1;

    @media screen and (max-width: 480px) {
        margin-top: -100px;
    }
`

export const HeroContent = styled.div`
    position: absolute;
    margin-bottom: 500px;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeroH1 = styled.h1`
    color: #white;
    font-size: 48px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 270px;
    text-shadow: 0 0 0.2em hsl(195 50% 50%);
    font-family: 'Saira Extra Condensed', sans-serif;
    font-weight: bold;

    @media screen and (max-width: 768px) {
        font-size: 30px;
        margin-left: 23vw;
      }

    @media screen and (max-width: 640px) {
        font-size: 28px;
        margin-left: 15vw;
      }

    @media screen and (max-width: 480px) {
        font-size: 28px;
      }
`

function Tabs() {

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
  setToggleState(index)};

return(
    <HeroContainer id='benefits'>
      <HeroBg>
        <ParticleBackground></ParticleBackground>
        <ParticleBackground></ParticleBackground>
      </HeroBg>
    <div>
    <HeroContent>
        <HeroH1>GUILD MEMBER BENEFITS</HeroH1>
    </HeroContent>
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Sweep and Reap
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          The <br/>
          Room
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          3D Model
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          DAO Access
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Eliminate Targets and Reap The Rewards</h2>
          <hr />
          <p>
          Each holder is entitled to a vote, 50 percent of all secondary 
          sales go towards the Bounty Hunter Space Guild Dao. 
          Guild members are able to <br/> <br/>
          <b>Eliminate</b> targets by sweeping the floor of a community chosen NFT project on Sol. 
          What to do with the swept NFT’s will be decided by the community. They can be given out randomly to holders, 
          donated to charity, held, or even deleted. #HappyHunting <br/><br/>
          And <br/><br/> <b>Reap</b> the rewards by collecting their bounties. If holders choose to reap the reward, 
          the community gains access to special rewards from the Bounty Hunter Space Guild DAO.
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>The Tower Room Gallery</h2>
          <hr />
          <p>
          The Bounty Hunter Space Guild DAO will have access and control over the NFTs in the Tower Gallery. <br /> <br /> 
          A percentage of the mint sales will be used to fill up the room with NFT’s depending on the decided fair launch price.<br /> <br /> 
          1 SOL 200,000$<br /> 
          2 SOL 600,000$<br /> 
          3 Sol 1,000,000$<br /> <br /> 
          The room will provide complete transparency over what the DAO possesses. It will also coincide with the monthly floor sweeps for sustainability.  
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Metaverse</h2>
          <hr />
          <p>
          Holders will be given 3D renders of their Bounty Hunter helmets. 
          These helmets can be used in augmented reality and in the future — The Metaverse.
          The team aims to create a project that is metaverse ready, constantly adapting
          to any new innovations in the space.
          </p>
        </div>

        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <h2>Access to Merch and Future Airdrops</h2>
          <hr />
          <p>
            Bounty Hunter holders will be verified through Grape this will give them access to the following:<br/><br/>
            1. “The Guild” and “The Mission Room” Channels on discord. <br/>
            2. To vote for which NFT’s will be put into the Tower x BHSG room after the each Sweep. <br/>
            3. To vote on DAO decisions. <br/>
            3. Exclusive Bounty Hunter Space Guild merchendise and collectibles. <br/>
            4. Future world building airdrops.
          </p>
        </div>
      </div>
    </div> 
    </div>
  </HeroContainer>
  );
}

export default Tabs;