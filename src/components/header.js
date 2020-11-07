import React from "react"
import { Link } from "gatsby"
import Logo from "../images/celotehbahasa.svg"

function HeaderTemplate () {
  return (
    <div className ="header">
       <Link to="/"><img src={Logo} alt="CelotehBahsa's logo"/></Link>
      <div id="intro">

        <div id="avatar">
          <img src="https://pbs.twimg.com/profile_images/1322835228197556224/jJwEyHUX_400x400.png" alt="A portrait of Théo Blochet"/>
        </div>

        <div id="welcome_text">
          <p className="subtitle">
          Hi, I'm <a href="https://www.twitter.com/theoblochet">Théo</a>. My goal is to speak Indonesian fluently by the end of 2021. I learn the language for 3 hours a week with my teacher <a href="https://cintabahasa.com/teacher-and-staff/viona.html">Viona</a> and recap my revelations below. <Link to="/celoteh/tentang/kenapa">Why?</Link>
          </p>
        </div>

      </div>
    </div>
  )
} 

export default HeaderTemplate