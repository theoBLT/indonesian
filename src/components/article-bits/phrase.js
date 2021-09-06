import React from "react"
import { 
    WordHighlight
     } from "../article-bits/syntax";

export const Phrase = props => {
    const { original, translation, mapping } = props;
    return (
        <>
        <p className="phrase">
            {mapping.map((syntax, index)=> {
            return (
            <WordHighlight   
                rank={index}
                translation={syntax[2]}
                type={syntax[1]}
                link={syntax[3]}
                >{syntax[0]}</WordHighlight>
            )}
            )}
        
        <br/>
        <i>{translation}</i>
        </p>
        </>
    )
}