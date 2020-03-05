import React from "react" 
import Word from "../components/word"

export default props => {
    return (
        <div className = "session" key={props.key}>
        <h3>Session #{props.sessionNumber}</h3>
          <span className ="date">{props.sessionDate}</span>

            {/* loop over the words _*/}
            <ul>
              {props.sessionWords.map((definition, i) =>
                <Word
                key= {i}
                word = {definition.data.word}
                type = {definition.data.type}
                translation = {definition.data.translation}
                />
                )}
            </ul>
        </div>
    )
}