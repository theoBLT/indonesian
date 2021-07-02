import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

function Concepts() {
  const data = useStaticQuery(graphql`
    query GetArticles {
      allMarkdownRemark(
        filter: { frontmatter: { article_type: { eq: "article" } } }
      ) {
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
      <h3>Some recent tips</h3>
      <ul>
        {data.allMarkdownRemark.nodes.map((node, i) => (
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
