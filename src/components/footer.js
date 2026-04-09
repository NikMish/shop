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
                    <Link to="/about">About and Contact</Link>
                </li>
                <li>
                    <Link to="/shipping">Shipping Policy</Link>
                </li>
                <li>
                    <Link to="/return">Return & Exchange Policy</Link>
                </li>
                <li>
                    <Link to="/market">Market</Link>
                </li>
                <li>
                    <Link to="/custom-keychains">Custom</Link>
                </li>
            </ul>
        </nav>

        <StaticImage
            className="shop-logo"
            layout="constrained"
            formats={["auto", "webp", "avif"]}
            src="../images/misharev-shop-logo.png"
            width={80}
            quality={95}
            alt="Misharev shop logo"
            style={{margin: "0 auto 2rem"}}
        />

        <div className="shop-footer-credit">
            © {new Date().getFullYear()} misharev.com
        </div>
      </footer>
  )
}

export default ShopFooter