import React from "react"
import { Link } from "gatsby"
import Logo from "../images/celotehbahasa.svg"

function HeaderTemplate (props) {
  const {short} = props;
  return (
    <div className ="header">
       <Link to="/"><img src={Logo} alt="CelotehBahsa's logo"/></Link>
      <div id="intro" className={short?`hidden`:``}>

        <div id="avatar">
          <a href="/buy">
          <img src="https://pbs.twimg.com/profile_images/1322835228197556224/jJwEyHUX_400x400.png" alt="A portrait of Théo Blochet"/>
          </a>
        </div>

        <div id="welcome_text">
          <p className="subtitle">
          Hi, I'm <a href="https://www.twitter.com/theoblochet">Théo</a>. My goal is to speak Indonesian fluently by the end of 2021. I study the language for 3 hours a week with my teacher Viona and recap what I learn below. <Link to="/celoteh/tentang/kenapa">Why?</Link>
          </p>
        </div>

      </div>
    </div>
  )
} 

export default HeaderTemplate