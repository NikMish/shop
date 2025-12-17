import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from "../components/layout"
import Seo from "../components/seo"
import PaypalButton from '../components/paypal-button';

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
                      <GatsbyImage image={getImage(file.childImageSharp.gatsbyImageData)} alt={`Hand made upcycled ${item.name} - ${index + 1}`} />
                    ) : (
                      <img src={`/${imgSrc}`} alt={`${item.name} - ${index + 1}`} />
                    )}
                </div>
              )
            })}
          </>
        )}

        <div className="description" dangerouslySetInnerHTML={{ __html: item.description }}></div>
        {item.sold ? (
          <div className="sold-notice">This item is sold, please see my current selection of handmade <Link to={`/category/${item.category}/`}>{item.category}</Link>.</div>
        ) : (
          <div className="price-section">
            <div className="price-tag">Price: ${item.price}</div>
            <PaypalButton item={item} />
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
export const Head = ({data}) => <Seo title={data.dataJson.name} description={data.dataJson.description} ogimage={data.dataJson.images && data.dataJson.images[0] ? `/${data.dataJson.images[0]}` : null} slug={`shop/${data.dataJson.slug}`} />

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
      slug
      category
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
