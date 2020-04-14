import React from "react" 
import Word from "../components/word"

export default props => {
    const {key,sessionNumber,sessionDate,sessionWords} = props;
    return (

        <div className = "session" key={key}>
        <h3>Session #{sessionNumber}</h3>
          <span className ="date">{sessionDate}</span>

            <ul>
              {sessionWords.map((definition, i) =>
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