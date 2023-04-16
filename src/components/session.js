import React from "react"
import Word from "../components/word"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default (props) => {
  const { key, sessionNumber, sessionDate, sessionWords, sessionIntro } = props
  return (
    <div className="session" key={key}>
      <h2>Class #{sessionNumber}</h2>
      <span className="small-subtitle">{sessionDate}</span>
      <div className="sessionIntro">
        <MDXRenderer>{sessionIntro ? sessionIntro : null}</MDXRenderer>
      </div>
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
