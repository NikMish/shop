/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, mDescription, title, ogimage, slug, children, product }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );
  
  const metaTitle = title || site.siteMetadata?.title
  const metaDescription = (mDescription) ? mDescription : (description) ? description.replace(/(<([^>]+)>)/gi, "") : site.siteMetadata.description
  const ogImage = ogimage || "/images/misharev-shop-logo.png"
  const siteUrl = "https://misharev.com"
  const pageUrl = slug ? `${siteUrl}/${slug}` : siteUrl

  return (
    <>
      {/* <link rel="canonical" href={`https://misharev.com${slug ? `/${slug}` : ''}`} /> */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={pageUrl} />
      <meta property="fb:app_id" content="1207599554660797" />
      <meta name="facebook-domain-verification" content="qufstx0y56x91ap4ydk6k4yu4gke7q" />

      {children}
    </>
  )
}

export default Seo
