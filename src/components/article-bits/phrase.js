import React from "react"
import { 
    DiscourseParticle,
    Verb,
    Possessive,
    Adjective,
    Adverb,
    Noun,
    Punctuation,
    Preposition
     } from "../article-bits/syntax";

export const Phrase = props => {
    const { original, translation, mapping } = props;
    return (
        <>
        <span className="phrase">{
            mapping.map(syntax => {
                if(syntax[1]=='discourse_particle'){
                   return (<><DiscourseParticle>{syntax[0]}</DiscourseParticle>{' '}</>)
                }
                if(syntax[1]=='verb'){
                    return(<><Verb>{syntax[0]}</Verb>{' '}</>)
                }
                if(syntax[1]=='possessive'){
                    return(<><Possessive>{syntax[0]}</Possessive>{` `}</>)
                }
                if(syntax[1]=='adjective'){
                    return(<><Adjective>{syntax[0]}</Adjective>{` `}</>)
                }
                if(syntax[1]=='adverb'){
                    return(<><Adverb>{syntax[0]}</Adverb>{` `}</>)
                }
                if(syntax[1]=='noun'){
                    return(<><Noun>{syntax[0]}</Noun>{` `}</>)
                }
                if(syntax[1]=='preposition'){
                    return(<><Preposition>{syntax[0]}</Preposition>{` `}</>)
                }
                if(syntax[1]=='punctuation'){
                    return(<><Punctuation>{syntax[0]}</Punctuation></>)
                }
                else{
                     return 'ignored'
                }
                }
            )}
        </span>
        <br/>
        <span><i>{translation}</i></span>
        </>
    )
}