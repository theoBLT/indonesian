import React from "react"
import ReactTooltip from "react-tooltip"

export const DiscourseParticle = props => {
    return (
    <>
    <span data-tip data-for="discourseParticleTip" className="syntax-component discourse-particle">{props.children}</span>
    <ReactTooltip id="discourseParticleTip" place="top" effect="solid">
        Discourse particle
    </ReactTooltip>
    </>
    );
}

export const Verb = props => {
    return (
    <span className="syntax-component verb">{props.children}</span>
    );
}

export const Adjective = props => {
    return (
    <span className="syntax-component adjective">{props.children}</span>
    );
}

export const Noun = props => {
    return (
    <span className="syntax-component noun">{props.children}</span>
    );
}

export const Preposition = props => {
    return (
    <span className="syntax-component preposition">{props.children}</span>
    );
}

export const Adverb = props => {
    return (
    <span className="syntax-component adverb">{props.children}</span>
    );
}

export const Punctuation = props => {
    return (
    <span className="syntax-component punctuation">{props.children}</span>
    );
}

export const Possessive = props => {
    const word = props.children;
    const beginning = word.slice(0,-3);
    const highlighted = word.slice(-3);

    return (
        <span className="syntax-component possessive">
            {beginning}<span className="nya">{highlighted}</span>
        </span>
    )
}