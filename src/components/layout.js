import * as React from "react"
import ShopHeader from "./header"
import ShopFooter from "./footer"

import "../shop.scss"

const Layout = ({ children, currentPath }) => {
  const isRootPath = (currentPath === '/') ? true : false
  
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <ShopHeader isRootPath={isRootPath} />
      {children}
      <ShopFooter isRootPath={isRootPath} />
    </div>
  )
}

export default Layout
