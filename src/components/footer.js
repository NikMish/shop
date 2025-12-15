import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ShopFooter = ({isRootPath}) => {
  

  return (
     <footer>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/market">Market</Link>
                </li>
            </ul>
        </nav>

        © {new Date().getFullYear()} misharev.com
      </footer>
  )
}

export default ShopFooter