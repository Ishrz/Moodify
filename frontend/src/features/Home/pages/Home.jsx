import React from 'react'
import FaceExpression from "../../expression/pages/components/FaceExpression.jsx"
import Player from '../components/Player.jsx'
import "../styles/Home.scss"

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <FaceExpression/>
      </div>
      <Player/>
    </div>
  )
}

export default Home
