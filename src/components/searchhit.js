import React from "react"
import {Link} from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const Searchhit = (props) => {
    const {hit} = props
  return (
    <Link to={hit.slug} className="searchresult">
        
        <span className="result-word">
            <Highlight hit={hit} attribute="word" tagName="mark"/> 
        </span>

        <span className="result-arrow">
        → 
        </span>

        <span className="result-translation">
            <Highlight hit={hit} attribute="translation" tagName="mark"/> 
        </span>

        <span className="result-example">
        <Highlight hit={hit} attribute="example" tagName="mark"/> 
        </span>
    </Link>
  )
}

export default Searchhit
