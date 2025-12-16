import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CategoryNav from "../components/category-nav"

const ShopIndex = ({ data, pageContext, path }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const currentCategory = pageContext.category;
  const items = data.allDataJson.edges.sort((a, b) => {
    return (b.node.order) < (a.node.order) ? 1 : -1
  }).sort((a, b) => {
    return (a.node.sold) > (b.node.sold) ? 1 : -1
  })
  const files = (data.allFile && data.allFile.nodes) || []
  const fileMap = new Map(files.map(f => [f.relativePath, f]))
 
  if (items.length === 0) {
    return (
      <Layout currentPath={path} title={siteTitle}>
        <p>
          Can't find any items, sorry.
        </p>
      </Layout>
    )
  }

  return (
    <Layout currentPath={path} title={siteTitle}>
        
      <CategoryNav currentCategory={currentCategory} /> 
      
      <main className="shop-gallery">

        {items.map(({ node }) => {
          const title = node.name
          const imgUrl = (node.images && node.images[0]) || ""

          return (
            <div className="shop-card" key={node.id || node.slug}>
              <Link to={`/shop/${node.slug}`} itemProp="url">
                {imgUrl && (
                  <div className="image-wrap">
                    {(() => {
                      const file = fileMap.get(imgUrl)
                      if (file && file.childImageSharp) {
                        const img = getImage(file.childImageSharp.gatsbyImageData)
                        return <GatsbyImage image={img} alt={title} />
                      }
                      return <img src={`/${imgUrl}`} alt={title} />
                    })()}

                    {node.sold && (
                      <div className="sold-overlay">SOLD</div>
                    )}
                  </div>
                )}
                <div className="content">
                  <span itemProp="headline">{title}</span>
                </div>
              </Link>
                <div className={`price-tag sold-${node.sold}`}>
                  <div>${node.price}</div>
                  {!node.sold && (
                    <div className="paypal-button">
                      <a href={node.paypal}>Buy with PayPal</a>
                    </div>
                  )}
                </div>
            </div>
          )
        })}
      </main>
    </Layout>
  )
}

export default ShopIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({pageContext}) => <Seo title={`Category ${pageContext.category}`} slug={`category/${pageContext.category}`} />

export const pageQuery = graphql`
  query ($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allDataJson(filter: {category: {eq: $category}}) {
      edges {
        node {
          id
          order
          category
          description
          images
          name
          paypal
          price
          sold
          slug
        }
      }
      distinct(field: {category: SELECT})
    }
    allFile(filter: {relativePath: {regex: "/shop-images/"}}) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 800, height: 800, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  }
`
