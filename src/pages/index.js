import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CategoryNav from "../components/category-nav"
import PaypalButton from '../components/paypal-button';

const ShopIndex = ({ data, path }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
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
        <Seo title="Misharev: Welcome to my shop" />
        <p>
          Can't find any items, sorry.
        </p>
      </Layout>
    )
  }

  return (
    <Layout currentPath={path} title={siteTitle}>
      <div className="intro-text">
        <h2>The Value of Handmade in a Mass-Produced World</h2>
        <p>At Misharev, we believe that the items you carry every day—the bag on your shoulder, the keychain in your pocket, the apron you wear to create—should have a soul. In a world flooded with fast fashion and disposable goods, we are dedicated to the "slow stitch," the thoughtful design, and the enduring quality of handmade craftsmanship.</p>
      </div>
        
      <CategoryNav />
      
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
                        return <GatsbyImage image={img} alt={title || 'Unique and handmade item'} />
                      }
                      return <img src={`/${imgUrl}`} alt={title || 'Unique and handmade item'} />
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
                      <PaypalButton item={node} />
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
export const Head = () => <Seo title="Welcome to my shop | Misharev.com" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allDataJson(sort: {sold: ASC}) {
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
