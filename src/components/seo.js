/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, ogimage, slug, children, product }) => {
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
  )

  const metaTitle = title || site.siteMetadata?.title
  const metaDescription = (description) ? description.replace(/(<([^>]+)>)/gi, "") : site.siteMetadata.description
  const ogImage = ogimage || "/images/misharev-shop-logo.png"
  const siteUrl = "https://misharev.com"
  const pageUrl = slug ? `${siteUrl}/${slug}` : siteUrl

  // Buld schema.org structured data if schema prop is provided.
  const schema = {}

  // Date
  const date = new Date();

  if (product) {
    schema["@context"] = "https://schema.org"
    schema["@type"] = "Product"
    schema["name"] = product.name
    schema["description"] = metaDescription
    schema["sku"] = product.slug
    schema["brand"] = {
      "@type": "Brand",
      "name": "Misharev.com"
    }
    schema["image"] = `${siteUrl}/${product.images && product.images[0] ? product.images[0] : ogImage}`
    schema["url"] = `${siteUrl}/shop/${product.slug}`
    schema["offers"] = {
      "@type": "Offer",
      "priceCurrency": "USD",
      "priceValidUntil": new Date(date.setFullYear(date.getFullYear() + 1)).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "price": product.price,
      "availability": product.sold ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "url": `${siteUrl}/shop/${product.slug}`,
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 14,
            "unitCode": "d"
          }
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD"
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "merchantReturnLink": "https://schema.org/StoreReturnPolicy",
        "returnPolicySeasonalOverride": "https://schema.org/NonSeasonalReturnPolicy",
        "merchantReturnDays": 7,
        "returnFees": "https://schema.org/FreeReturn",
        "inStoreReturnsOffered": true,
      }
    }
  }
  
  return (
    <>
      <link rel="canonical" href={`https://misharev.com${slug ? `/${slug}` : ''}`} />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={pageUrl} />
      <meta property="fb:app_id" content="1207599554660797" />
      <meta name="facebook-domain-verification" content="qufstx0y56x91ap4ydk6k4yu4gke7q" />

      {(schema && product) && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {children}
    </>
  )
}

export default Seo
