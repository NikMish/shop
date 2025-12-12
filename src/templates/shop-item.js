import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Seo from "../components/seo"

const ItemTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const item = data.dataJson;
  console.log("item data:", item.images);
  return (
    <Layout location={location} title={siteTitle}>
      <h1>{item.name}</h1>
     
      {item.images && item.images.length > 0 && (
        <>
          {item.images.map((imgSrc, index) => (
            <img 
              key={index} 
              src={`/${imgSrc}`} 
              alt={`${item.name} image ${index + 1}`} 
              style={{ maxWidth: "500px", marginBottom: "1rem" }} 
            />
          ))}
        </>
        
      )}

      <p>{item.description}</p>
      <a href="/">Go back home</a>
    </Layout>
  );
};

export default ItemTemplate;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const query = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    dataJson(slug: { eq: $slug }) {
      name
      description
      images
    }
  }
`;
