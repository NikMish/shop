import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from "../components/layout"
import Seo from "../components/seo"

const ItemTemplate = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const item = data.dataJson;
  const files = (data.allFile && data.allFile.nodes) || []
  const fileMap = new Map(files.map(f => [f.relativePath, f]))
  
  return (
    <Layout title={siteTitle}>
      <div className="shop-item">
        <h1>{item.name}</h1>
      
        {item.images && item.images.length > 0 && (
          <>
            {item.images.map((imgSrc, index) => {
              const file = fileMap.get(imgSrc)
              return (
                <div className="shop-item-image" key={index}>
                    {file && file.childImageSharp ? (
                      <GatsbyImage image={getImage(file.childImageSharp.gatsbyImageData)} alt={`${item.name} image ${index + 1}`} />
                    ) : (
                      <img src={`/${imgSrc}`} alt={`${item.name} image ${index + 1}`} />
                    )}
                </div>
              )
            })}
          </>
        )}

        <p>{item.description}</p>
        {item.sold ? (
          <div className="sold-notice">This item has been sold.</div>
        ) : (
          <div className="price-section">
            <div className="price-tag">Price: ${item.price}</div>
            <div className="paypal-button">
              <a href={item.paypal} rel="noopener noreferrer">Pay with PayPal</a>
            </div>
          </div>
        )}

        <a href="/">Go back home</a>
      </div>
    </Layout>
  );
};

export default ItemTemplate;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({data}) => <Seo title={data.dataJson.name} description={data.dataJson.description} ogimage={data.dataJson.images && data.dataJson.images[0] ? `/${data.dataJson.images[0]}` : null} />

export const query = graphql`
  query ($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    dataJson(slug: { eq: $slug }) {
      name
      description
      images
      price
      paypal
      sold
    }
    allFile(filter: {relativePath: {regex: "/shop-images/"}}) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 600, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  }
`;
