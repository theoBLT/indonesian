import React from "react" 
import {capitalize} from "../utils/helpers.js"

export default props =>  {
    const {word, type, translation, key} = props;
    return (
        <li key={key}>
            <span className="word">{capitalize(word)}</span> 
            <span className="type">({type})</span> 
            <span className="translation">{capitalize(translation)}</span>
      </li>
    )
}