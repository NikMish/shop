import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ShopIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const items = data.allDataJson.edges
  const categories = data.allDataJson.distinct
console.log("items", items, "Categories:", categories);
  if (items.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          Can't find any items, sorry.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ listStyle: `none` }}>
        {items.map(item => {
          const title = item.node.name
          const imgUrl = item.node.images[0] || ""

          return (
            <li key={item.id}>
              <article
                className="list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`/shop/${item.node.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section>
                  {
                    imgUrl && (<img 
                      src={`/${imgUrl}`} 
                      alt={title} 
                      style={{ maxWidth: "300px", marginBottom: "1rem" }} 
                    />)
                  }
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default ShopIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Welcome to my shop" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allDataJson {
      edges {
        node {
          id
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
  }
`
