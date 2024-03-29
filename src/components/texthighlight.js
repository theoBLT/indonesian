import React from "react"

function Texthighlight(props) {
  const { highlight, paragraph } = props

  const regex = new RegExp(`${highlight}(?=[.,!?;:]|\\s|$)`, "gi")
  const highlightedParagraph = paragraph.replace(
    regex,
    `<span class="example-highlight">$&</span>`
  )

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: highlightedParagraph }}></span>
    </>
  )
}

export default Texthighlight
