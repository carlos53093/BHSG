import React from 'react'
import ReactPlayer from 'react-player'
import "./video.css"
import styled from 'styled-components'

export const HeroContent = styled.div`
    text-align: center;
    height: 100px;
`

export const HeroH1 = styled.h1`
    color: #fff;
    font-size: 55px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-shadow: 0 0 0.2em hsl(195 50% 50%);
    font-family: 'Saira Extra Condensed', sans-serif;
    font-weight: bold;
  
@media screen and (max-width: 768px) {
    font-size: 48px;}

@media screen and (max-width: 768px) {
    font-size: 32px;}

`

const Video = () => (
    <>
    <HeroContent id="lore">
      <HeroH1>BHSG Codex: Amora</HeroH1>
    </HeroContent>
    <div className="player-wrapper">
      <ReactPlayer
        url="https://youtu.be/d7xpBzYt4JA"
        className="react-player"
        width="100%"
        height="80%"
        controls={true}
        loop={true}
      />
    </div>
    </>
  );
  
export default Video;

