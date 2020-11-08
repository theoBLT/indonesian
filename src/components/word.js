import React, {useState, useEffect} from "react"
import {capitalize, getAngles} from "../utils/helpers.js"

export default props =>  {
    const {word, type, translation, key, example} = props;
    const [visible, setVisible] = useState(false);
    const [angles, setAngles] = useState([]);

    useEffect(()=>{
        return setAngles(getAngles());
    },[]);
    
    return (
        <div key={key} className = "definition">
        <a  className="clickable" onClick={() => setVisible(!visible)}>
            <span className="word" style={{clipPath:`polygon(`+angles[0]+`% 0%, 100% 2%,`+ angles[1]+`% 100%, 0% 99%)`}}>
                {capitalize(word)}
            </span> 
        </a>
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