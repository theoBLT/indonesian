import React, {useState} from "react"
import {capitalize} from "../utils/helpers.js"

export default props =>  {
    const {word, type, translation, key, example} = props;
    const [visible, setVisible] = useState(false);
    return (
        <li key={key} className="clickable" onClick={() => setVisible(!visible)}>
            <span className="word">
                {capitalize(word)}
            </span> 
            <span className={visible? "metadata loaded" : "metadata"}>
                
                <span className="type">
                    {type}  ·
                </span> 

                <span className="translation">
                    {capitalize(translation)}
                </span>
                <div className="examplebox">
                {example? 
                    <span className="example">
                        {capitalize(example)}
                    </span>
                : null}
                </div>
             </span>
      </li>
    )
}