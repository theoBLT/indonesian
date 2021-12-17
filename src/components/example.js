import React from "react"
import { Phrase } from "../components/article-bits/phrase"
import Texthighlight from "./texthighlight"

function Example(props) {
  const { word, example, mapping } = props
  let splits

  if (!example){
      return null;
  }
  
  // Handling for conversation-style examples
  if (example.startsWith("A: ")){
      splits = example.split(/[AB]: /).slice(1)
      return (
          <div className="conversation-thread">
          {splits.map(dialogitem => <blockquote><Texthighlight highlight={word} paragraph={dialogitem} /></blockquote>)}
          </div>
      ) 
  }

  // For all other examples, use the 'standard' style
  return (
    <blockquote>{mapping?<Phrase original={example} mapping={mapping}/>:<Texthighlight highlight={word} paragraph={example} />}</blockquote>
  )
}

export default Example
