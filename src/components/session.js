import React from "react"
import Word from "../components/word"

const Session = (props) => {
  const { sessionNumber, sessionDate, sessionWords } = props
  return (
    <div className="session">
      <h2>Class #{sessionNumber}</h2>
      <span className="small-subtitle">{sessionDate}</span>
      <div className="wordsList">
        {sessionWords &&
          sessionWords.map((definition, i) => (
            <Word
              key={i}
              word={definition.data.word}
              type={definition.data.type}
              translation={definition.data.translation}
              example={definition.data.example}
              context={definition.data.context}
              slug={definition.data.slug}
            />
          ))}
      </div>
    </div>
  )
}

export default Session
