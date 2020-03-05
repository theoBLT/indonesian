import React from "react" 

export default props =>  {
    return (
        <li key={props.key}>
            <span className="word">{props.word}</span> 
            <span className="type">({props.type})</span> 
            <span className="translation">{props.translation}</span>
      </li>
    )
}