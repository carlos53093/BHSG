import React from 'react'
import particlesconfig from "./particle-config";
import Particles from "react-particles-js"

const ParticleBackground = () => {
    return (
        <div style={{backgroundColor: "black"}}>
            <Particles params={particlesconfig}></Particles>
        </div>
    )
}

export default ParticleBackground
