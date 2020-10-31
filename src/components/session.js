import React from "react" 
import Word from "../components/word"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default props => {
    const {key,sessionNumber,sessionDate,sessionWords,sessionIntro} = props;
    return (

        <div className = "session" key={key}>
        <h3 className ="sessionTitle">Session #{sessionNumber}</h3>
          <span className ="date">{sessionDate}</span>
          <div className = "sessionIntro">
          <MDXRenderer>{sessionIntro}</MDXRenderer>
          </div>
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