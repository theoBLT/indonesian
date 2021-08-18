import React from 'react'

const WordOfTheDay = (props) =>{
    const { word , translation , type , example } = props
    return (
        
        <div className="wotd">
        <h1>Word of the day </h1>
        <h2>{word}</h2>
        <h3>{translation}</h3>
        <blockquote>{example}</blockquote>
        </div>
        
    )
}

export default WordOfTheDay
