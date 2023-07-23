import React from "react"

const Pronounce = (props) => {
  const { text, language } = props

  const sayIt = (text, language) => {
    var synth = window.speechSynthesis

    var u = new SpeechSynthesisUtterance()
    u.text = text
    u.lang = language
    synth.speak(u)
  }

  return <button onClick={() => sayIt(text, language)}> {text} 🔉</button>
}

export default Pronounce
