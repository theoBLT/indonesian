import React from "react"

function HeaderTemplate (props) {
  const {text,translation} = props;
  return (
    <div className ="header">
      <h1 className="title">{text}</h1>
      <h1 className="title translated">{translation}</h1>

      <p className="subtitle">Each week, I get to learn 10 new words with my Indonesian teacher, recapped here for personal convenience.</p>
    </div>
  )
}

export default HeaderTemplate