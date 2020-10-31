import React from "react"
import Logo from "../images/celotehbahasa.svg"

function HeaderTemplate () {
  return (
    <div className ="header">
      <img src={Logo}/>
      <div id="intro">

        <div id="avatar">
          <img src="https://pbs.twimg.com/profile_images/1281572845877964800/wVwtNrSE_400x400.jpg"/>
        </div>

        <div id="welcome_text">
          <p class="subtitle">
          Hi, I'm <a href="https://www.twitter.com/theoblochet">Théo</a>. My goal is to speak Indonesian fluently by end of 2021. I learn the language for 3 hours a week with my teacher <a href="https://cintabahasa.com/teacher-and-staff/viona.html">Viona</a> and recap my revelations below.
          </p>
        </div>

      </div>
    </div>
  )
} 

export default HeaderTemplate