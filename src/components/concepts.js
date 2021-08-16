import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

function Concepts(props) {
  const { title } = props
  const data = useStaticQuery(graphql`
  query GetArticles {
    allMdx(filter: {frontmatter: {article_type: {eq: "article"}}}) {
      nodes {
        frontmatter {
          title
          path
        }
        excerpt
      }
    }
  }  
  `)
  return (
    <div id="concept">
      <h1>{title}</h1>
      <ul>
        {data.allMdx.nodes.map((node, i) => (
          <li>
            <Link key={i} to={node.frontmatter.path}>
              <h3>
              {node.frontmatter.title}
              </h3>
            </Link> 
            {node.excerpt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Concepts
