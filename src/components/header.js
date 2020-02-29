import React from "react"

function HeaderTemplate (props) {
  const text = props.headerText
  const translation = props.headerTranslation
  return (
    <div className ="header">
      <h1 className="title">{text}</h1>
      <h1 className="title translated">{translation}</h1>

      <p className="subtitle">2 kelas seminggu. 10 kata bahasa Indonesia baru setiap kali.</p>
      <p className="subtitle translated">2 classes a week. 10 new Indonesian words each time.</p>
    </div>
  )
}

export default HeaderTemplate