import React from "react"
import { Phrase } from "../components/article-bits/phrase"

function Example(props) {
  const { example, mapping } = props
  let splits

  if (!example){
      return null;
  }
  
  // Handling for conversation-style examples
  if (example.startsWith("A: ")){
      splits = example.split(/[AB]: /).slice(1)
      return (
          <div className="conversation-thread">
          {splits.map(dialogitem => <blockquote>{dialogitem}</blockquote>)}
          </div>
      ) 
  }

  // For all other examples, use the 'standard' style
  return (
    <blockquote>{mapping?<Phrase original={example} mapping={mapping}/>:example}</blockquote>
  )
}

export default Example
