import React from "react" 

export default props => {
    return (
        <div className = "innerSession">
        <h3>Session #{props.sessionNumber}</h3>
          <span className ="date">{props.sessionDate}</span>

            {/* loop over the words _*/}
            <ul>
            {props.sessionWords.map((definition, i) =>
              <li key={i}>
                <span className="word">{definition.data.word}</span> <span className="type">({definition.data.type})</span> 
                <span className="translation">{definition.data.translation}</span>
              </li>
              )}
            </ul>
        </div>
    )
}