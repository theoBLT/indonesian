import React from "react"
import Example from "./example"

function Definition(props) {
  const { word, translation, example, type, rank, mapping, context } = props
  return (
      
      <>
      {/* Definition number is +2 because there's already a first definition, and array count of extra definitions index starts at 0 */}
      {typeof rank !== 'undefined' ? <h3>{rank+2}.</h3> :''}
        <span className="dictionary-translation">{translation}</span> {" • "}
        <span className="small-subtitle">{type}</span>
        {context?
                <div className="context">
                  {context}
                </div>
                : null}
        <Example
          example = {example} 
          mapping = {mapping}
          word = {word}
        />
      </>
  )
}

export default Definition
