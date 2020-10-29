import React from "react"

function HeaderTemplate (props) {
  const {text,translation} = props;
  return (
    <div className ="header">
      <h1 className="title">{text}</h1>
      <h1 className="title translated">{translation}</h1>

      <p className="subtitle">My goal is to be fluent in Indonesian by end of 2021. Each week, I spend 3 hours learning Indonesian with <a href="https://cintabahasa.com/teacher-and-staff/viona.html">Viona</a> from <a href="https://cintabahasa.com/">Cinta Bahasa</a>, and recap the words I learn below.</p>
    </div>
  )
}

export default HeaderTemplate