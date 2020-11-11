import React, {useState, useLayoutEffect} from "react"
import {capitalize, getAngles} from "../utils/helpers.js"

export default props =>  {
    const {word, type, translation, key, example} = props;
    const [visible, setVisible] = useState(false);
    const [angles, setAngles] = useState([]);

    useLayoutEffect(()=>{
        return setAngles(getAngles());
    },[]);
    
    return (
        <div key={key} className = "definition">
        <button type="button" className="word" style={{clipPath:`polygon(`+angles[0]+`% 0%, 100% 2%,`+ angles[1]+`% 100%, 0% 99%)`}} onClick={() => setVisible(!visible)}>
                {capitalize(word)}
        </button>
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

      </div>
    )
}