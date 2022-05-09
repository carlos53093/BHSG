import React, { useEffect, useState } from 'react'
import './carousel.css'
import {
    Paper,
  } from '@material-ui/core'
import { styled } from '@material-ui/styles';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    lineHeight: '24px',
    position: 'absolute',
    padding: '2px 15px',
    top: '-15px',
    left: '-10px'
  }));

const Carousel = (props) => {
    const {children, show, length} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    // const [length, setLength] = useState(children.length)

    const [touchPosition, setTouchPosition] = useState(null)

    // // Set the length to match current children from props
    // useEffect(() => {
    //     setLength(children.length)
    // }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    return (
        <div className="carousel-container">
            <Item>{props.title}</Item>
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="left-arrow">
                        &lt;
                    </button>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`}
                        style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                    >   
                        {children}
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex < (length - show - 1) &&
                    <button onClick={next} className="right-arrow">
                        &gt;
                    </button>
                }
            </div>
        </div>
    )
}

export default Carousel
