import React from "react"
import ReactTooltip from "react-tooltip"
import {Link} from "gatsby"

export const WordHighlight = props => {
    const {rank, children, type, translation, link } = props;
    console.log(link);
    let tooltip_content = translation;
    let content = <>{children}</>;
    let short_type = "n";

    // Defining highlight content and tooltip content per word type
    switch(type){
        case "discourse_particle":
            tooltip_content=children
            short_type ="dp"
            break;
        case "possessive":
            const beginning = children.slice(0,-3);
            const highlighted = children.slice(-3);
            content = <>{beginning}<span className="nya">{highlighted}</span></>
            short_type="n"
            break;
    }    

    return (
        <>
        <span data-tip data-for={`${rank}`} className={`syntax-component ${type}`}>{content}</span>{type=="puncutation"?"":" "}
        <ReactTooltip delayHide={100} delayShow={100} className="word-highlight" id={`${rank}`} globalEventOff='click'  place="top" effect="solid">
            <span className={`highlight-${type}`}>{short_type}</span> • {tooltip_content} {link?<Link to={`/${link}`}>def</Link>:''}
        </ReactTooltip>
        </>
    )
}