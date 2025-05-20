import React from 'react'
import './Display.css'
import Carousel from 'react-bootstrap/Carousel';
import img1 from './images/img1.jpeg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
const Display = () => {
  return (
    <Carousel interval={2500} fade>
      <Carousel.Item>
        <img src={img1} style={{height:'400px',borderRadius: '20px',overflow:'hidden'}} className="w-100" />
        <Carousel.Caption>
          <h1 style={{fontSize:'50px'}}>
          Upload, Share, Conquer!</h1>
          <p>Share your epic gameplay moments with the world.🎮✨</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img2} style={{height:'400px',borderRadius: '20px'}} className="w-100" />
        <Carousel.Caption>
        <h1 style={{fontSize:'50px'}}>Game, Clip, Repeat</h1>
          <p>Capture your best moves and show them off!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img3} style={{height:'400px',borderRadius: '20px'}} className="w-100" />
        <Carousel.Caption>
          <h1 style={{fontSize:'50px'}}> Your Game, Your Highlights!</h1>
          <p>Upload, showcase, and get noticed.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img4} style={{height:'400px',borderRadius: '20px'}} className="w-100" />
        <Carousel.Caption>
          <h1 style={{fontSize:'50px'}}>Level Up Your Clips!</h1>
          <p>Share your best gaming moments and join the leaderboard!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Display