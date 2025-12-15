import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ShopHeader = ({isRootPath}) => {
  let header
  
    if (isRootPath) {
        header = (
        <StaticImage
            className="shop-logo"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/misharev-shop-logo.png"
            width={150}
            quality={95}
            alt="Misharev shop logo"
        />
        )
    } else {
        console.log("ShopHeader not root path");
        header = (
        <Link to="/">
            <StaticImage
                className="shop-logo"
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/misharev-shop-logo.png"
                width={150}
                quality={95}
                alt="Misharev shop logo"
            />
        </Link>
        )
    }

  return (
    <div className="header-shop">
        {header}
        <p>Welcome to Misharev Shop!</p>


    </div>
  )
}

export default ShopHeader