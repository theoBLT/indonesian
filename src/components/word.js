import React, {useState} from "react"
import {capitalize} from "../utils/helpers.js"

export default props =>  {
    const {word, type, translation, key, example} = props;
    const [visible, setVisible] = useState(false);
    console.log(visible);
    return (
        <li key={key} class={example? "clickable" :""}onClick={() => setVisible(!visible)}>
            <span className="word">{capitalize(word)}</span> 
            <span className="type">({type})</span> 
            <span className="translation">{capitalize(translation)}</span>
            {example? <span className={visible? "example" : "example hidden"}>{example}</span> : null}
      </li>
    )
}