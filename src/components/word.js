import { Link } from "gatsby"
import React, { useState, useLayoutEffect } from "react"
import { capitalize, getAngles } from "../utils/helpers.js"

const Word = (props) => {
  const { word, type, translation, key, example, slug } = props
  const [visible, setVisible] = useState(false)
  const [angles, setAngles] = useState([])

  useLayoutEffect(() => {
    return setAngles(getAngles())
  }, [])

  if (!type | !translation) {
    // If the word is incomplete, only show a link to the target word, no expandable.
    return (
      <div key={key} className="definition">
        <Link to={slug}>
          <a
            className="word"
            style={{
              clipPath:
                `polygon(` +
                angles[0] +
                `% 0%, 100% 2%,` +
                angles[1] +
                `% 100%, 0% 99%)`,
            }}
            onClick={() => setVisible(!visible)}
            onKeyPress={() => setVisible(!visible)}
            role="button"
          >
            {capitalize(word)}
          </a>
        </Link>
      </div>
    )
  }

  return (
    <div key={key} className="definition">
      <button
        type="button"
        className="word"
        style={{
          clipPath:
            `polygon(` +
            angles[0] +
            `% 0%, 100% 2%,` +
            angles[1] +
            `% 100%, 0% 99%)`,
        }}
        onClick={() => setVisible(!visible)}
      >
        {capitalize(word)}
      </button>
      <span className={visible ? "metadata loaded" : "metadata"}>
        <span className="type">{type} ·</span>

        <span className="translation">{capitalize(translation)}</span>
        <div className="examplebox">
          {example ? (
            <span className="example">{capitalize(example)}</span>
          ) : null}
        </div>
        <div className="link-to-definition">
          <Link to={slug}>Read full definition</Link>
        </div>
      </span>
    </div>
  )
}

export default Word
