import React from "react"

function Texthighlight(props) {
  const { highlight, paragraph } = props
  const splitWords = paragraph.split(' ')
  
  splitWords.map((word) => console.log(word))

  
  const highlightedWords = splitWords.map((word) => word.toUpperCase() === highlight.toUpperCase()? `<span class ="example-highlight">${word}</span>` : word)
  const joinedWords = highlightedWords.join(' ')
  console.log(joinedWords);

  return (
      <>
      <span dangerouslySetInnerHTML={{__html: joinedWords}} >
      </span>
      </>
  )
}

export default Texthighlight
