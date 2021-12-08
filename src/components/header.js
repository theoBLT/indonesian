import React from "react"
import { Link } from "gatsby"
import Logo from "../images/celotehbahasa.svg"

function HeaderTemplate(props) {
  const { short } = props
  return (
    <div className="header">
      <Link to="/">
        CB.
      </Link>
      <div className="menubar">
        <Link to="about">About</Link>
      </div>
    </div>
  )
}

export default HeaderTemplate
