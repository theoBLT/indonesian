import React from "react"
import { useStaticQuery, graphql} from "gatsby"

function Definition(props) {
  const { translation, example, type, rank } = props
  console.log(`Rank is ${rank}`)
//   const data = useStaticQuery(graphql`
//   query GetArticles {
//     allMdx(filter: {frontmatter: {article_type: {eq: "article"}}}) {
//       nodes {
//         frontmatter {
//           title
//           path
//         }
//         excerpt
//       }
//     }
//   }  
//   `)
  return (
      
      <>
      {/* Definition number is +2 because there's already a first definition, and array count of extra definitions index starts at 0 */}
      {typeof rank !== 'undefined' ? <h3>{rank+2}.</h3> :''}
        <span className="dictionary-translation">{translation}</span> {" • "}
        <span className="small-subtitle">{type}</span>
        <blockquote>{example}</blockquote>
      </>
  )
}

export default Definition
