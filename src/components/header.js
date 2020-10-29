import React from "react"

function HeaderTemplate (props) {
  const {text,translation} = props;
  return (
    <div className ="header">
      <h1 className="title">{text}</h1>
      <h1 className="title translated">{translation}</h1>

      <div id="intro">

        <div id="avatar">
          <img src="https://pbs.twimg.com/profile_images/1281572845877964800/wVwtNrSE_400x400.jpg"/>
        </div>

        <div id="welcome_text">
          <p class="subtitle">
          Hi, I'm <a href="https://www.twitter.com/theoblochet">Théo</a>. My goal is to be fluent in Indonesian by end of 2021. Each week, I spend 3 hours learning Indonesian with my teacher <a href="https://cintabahasa.com/teacher-and-staff/viona.html">Viona</a>, and recap the words I learn below.
          </p>
        </div>

      </div>
    </div>
  )
} 

export default HeaderTemplate