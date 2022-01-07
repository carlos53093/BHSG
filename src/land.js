import React, { useEffect, useRef } from "react";

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
import { useParams } from "react-router-dom";

const Land = () => {
    const { id } = useParams();
    const hero = useRef(null);
    const card = useRef(null);
    const tabs = useRef(null);
    const map = useRef(null);
    const video = useRef(null);
    const faq = useRef(null);
    useEffect(()=>{
        switch(id) {
            case 'about':
                hero.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'benefits':
                tabs.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'roadmap':
                map.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'lore':
                video.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'team':
                card.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'faq':
                faq.current?.scrollIntoView({ behavior: 'smooth' })
                break;
        }
    },[id])
    
    return (
        <>
        <div style={{backgroundColor:'black'}}>
            <div  ref={hero}>
                <Hero />
            </div>
            <Info {...homeObjOne} />
            <div  ref={tabs}>
                <Tabs/>
            </div>
            <Carousel />
            <div ref={map}>
                <Map />
            </div>
            <div ref={video}>
                <Video />
            </div>
            <div ref={card}>
                <Cards />
            </div>
            <div ref={faq}>
                <Faq />
            </div>
            <Lore {...homeObjTwo}/>
            <Footer/>
        </div>
        </>
    );
} 

export default Land;