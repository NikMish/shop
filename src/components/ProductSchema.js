import React from 'react';

/**
 * Generates JSON-LD Product Schema for search engines.
 * 
 * Expected `product` prop shape:
 * {
 *   title: string,
 *   description: string,
 *   url: string,
 *   price: string | number,
 *   idOrSku: string,
 *   images: string[], // array of absolute image URLs
 *   isSoldOut: boolean,
 *   material?: string, // e.g. "PU Leather" or "Upcycled Denim"
 *   shippingPrice?: string | number // defaults to "0.70"
 * }
 */
const ProductSchema = ({ product }) => {
  if (!product) return null;

  // Format images array or fallback to a default image
  const imageList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.imageUrl || 'https://misharev.com/og-image.jpg'];

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": imageList,
    "description": product.description,
    "sku": product.idOrSku || product.id || product.slug || "MISHAREV-ITEM",
    "brand": {
      "@type": "Brand",
      "name": "Misharev"
    },
    ...(product.material && { "material": product.material }),
    "offers": {
      "@type": "Offer",
      "url": product.url || "https://misharev.com",
      "priceCurrency": "USD",
      "price": String(product.price || "0.00"),
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.isSoldOut 
        ? "https://schema.org/OutOfStock" 
        : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Misharev"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": String(product.shippingPrice || "0.00"),
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default ProductSchema;