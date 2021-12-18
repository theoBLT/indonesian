import React from "react"
import sanitizeHtml from 'sanitize-html';

function Texthighlight(props) {
  const { highlight, paragraph } = props
  const splitWords = paragraph.split(' ')
  
  splitWords.map((word) => console.log(word))

// TODO: Highlighting is broken in at least 2 ways, and will need fixing:
// 1. When the word to highlight contains a space, like `gelar tikar`
// 2. When the word is immediately followed by punctuation, like `tikar.`
  
  const highlightedWords = splitWords.map((word) => word.toUpperCase() === highlight.toUpperCase()? `<span class ="example-highlight">${word}</span>` : word)
  const joinedWords = highlightedWords.join(' ')
  const cleanHtml = sanitizeHtml(joinedWords,{allowedTags: ['span'],allowedAttributes: {
    span: [ 'class']}});

  return (
      <>
      <span dangerouslySetInnerHTML={{__html: cleanHtml}} >
      </span>
      </>
  )
}

export default Texthighlight
