import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  // Redirect logic for old/mistyped URLs
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const redirect = () => {
    if (currentPath === '/shop/') {
      window.location.href = '/'
    }
    else if (currentPath === '/shop/shoulder-bug-no-10/') {
      window.location.href = '/shop/shoulder-bag-no-10/'
    }
  }

  React.useEffect(() => {
    redirect()
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <div className="not-found content">
        <h1>Oops! Looks Like We Dropped a Stitch.</h1>

        <p>The page you're looking for has wandered off, or perhaps it's been upcycled into something new. Don't worry — you don't have to start from scratch.</p>

        <p>While we help find your way back, why not explore some of our favorite handmade collections?</p>

        <p><strong>Quick Links to Get Back on Track:</strong></p>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/category/Shoulder%20bags">Upcycled Denim Bags</a></li>
          <li><a href="/category/Aprons">Teacher & Utility Aprons</a></li>
          <li><a href="/category/Keychains">Keychains</a></li>
          <li><a href="/category/Decor">Custom Decor</a></li>
        </ul>

      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
