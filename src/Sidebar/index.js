import React from 'react'
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarLink, SidebarMenu} from './SidebarElements'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTwitter, faDiscord, faMedium} from "@fortawesome/free-brands-svg-icons"
import './icons.css'

const Sidebar = ({isOpen,toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about">About</SidebarLink>
                    <SidebarLink to="benefits">Utility</SidebarLink>
                    <SidebarLink to="roadmap">Roadmap</SidebarLink>
                    <SidebarLink to="lore">Lore</SidebarLink>
                    <SidebarLink to="team">Team</SidebarLink>
                    <SidebarLink to="faq">FAQ</SidebarLink>
                    <div className="parent">
                    <a href="https://twitter.com/BountyHunterNFT" className="twitter social"> 
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="https://discord.gg/YPDJGKWMNX" className="discord social"> 
                        <FontAwesomeIcon icon={faDiscord} size="2x" />
                    </a>
                    <a href="https://bountyhunterspaceguild.medium.com/" className="medium social"> 
                        <FontAwesomeIcon icon={faMedium} size="2x" />
                    </a>
                    </div>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
