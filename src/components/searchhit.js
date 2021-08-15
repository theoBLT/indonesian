import React from "react"
import {Link} from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const Searchhit = (props) => {
    const {hit} = props
  return (
    <div className="searchresult">
   
            <Link to={hit.slug}>
                <Highlight hit={hit} attribute="word" tagName="mark"/> 
            </Link>
        
        <span className="result-translation">
            <Highlight hit={hit} attribute="translation" tagName="mark"/> 
        </span>

        <span className="result-example">
        <Highlight hit={hit} attribute="example" tagName="mark"/> 
        </span>
    </div>
  )
}

export default Searchhit
