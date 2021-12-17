import React from "react"
import { Phrase } from "../components/article-bits/phrase"

function Example(props) {
  const { example, mapping } = props
  let splits
  
  if (example.startsWith("A: ")){
      splits = example.split(/[AB]: /).slice(1)
      console.log(splits)
      return (
          <div className="conversation-thread">
          {splits.map(dialogitem => <blockquote>{dialogitem}</blockquote>)}
          </div>
      ) 
  }

  return (
    <blockquote>{mapping?<Phrase original={example} mapping={mapping}/>:example}</blockquote>
  )
}

export default Example
