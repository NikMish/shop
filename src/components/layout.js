import * as React from "react"
import ShopHeader from "./header"
import ShopFooter from "./footer"

import "../shop.scss"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <ShopHeader isRootPath={isRootPath} />
      <main>{children}</main>
      <ShopFooter isRootPath={isRootPath} />
    </div>
  )
}

export default Layout
