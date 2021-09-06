import React from "react"
import { Phrase } from "../components/article-bits/phrase"

function Definition(props) {
  const { translation, example, type, rank, mapping } = props
  return (
      
      <>
      {/* Definition number is +2 because there's already a first definition, and array count of extra definitions index starts at 0 */}
      {typeof rank !== 'undefined' ? <h3>{rank+2}.</h3> :''}
        <span className="dictionary-translation">{translation}</span> {" • "}
        <span className="small-subtitle">{type}</span>
        <blockquote>{mapping?<Phrase original={example} mapping={mapping}/>:example}</blockquote>
      </>
  )
}

export default Definition
