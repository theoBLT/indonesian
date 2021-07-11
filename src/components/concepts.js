import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

function Concepts(props) {
  const { title } = props
  const data = useStaticQuery(graphql`
    query GetArticles {
      allMdx(filter: { frontmatter: { article_type: { eq: "article" } } }) {
        nodes {
          frontmatter {
            title
            path
          }
        }
      }
    }
  `)
  return (
    <div id="concept">
      <h3>{title}</h3>
      <ul>
        {data.allMdx.nodes.map((node, i) => (
          <li>
            <Link key={i} to={node.frontmatter.path}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Concepts
