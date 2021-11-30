import React from "react";

import Hero from "./About";
import Info from "./Info";
import Lore from "./Future";
import Map from "./Map"
import Tabs from "./Benefits";
import Carousel from "./Carousel";
import Cards from "./Team"
import { homeObjOne } from "./Info/Data";
import { homeObjTwo } from "./Future/Data";
import Footer from "./Footer";
import Faq from "./FAQ";
import Video from "./Video";

const Land = () => {

    
    return (
        <>
        <div style={{backgroundColor:'black'}}>

            <Hero/>
            <Info {...homeObjOne}/>
            <Tabs />
            <Carousel />
            <Map />
            <Video />
            <Cards />
            <Faq/>
            <Lore {...homeObjTwo}/>
            <Footer/>
        </div>
        </>
    );
} 

export default Land;