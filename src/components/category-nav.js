import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const CategoryNav = ({currentCategory, categoryData}) => {
    const data = useStaticQuery(
        graphql`
          {
            allDataJson(sort: {sold: ASC}) {
              distinct(field: {category: SELECT})
            }
          }
        `
      )

  const categories = data.allDataJson.distinct

console.log("categoryData", categoryData)
  const story = (currentCategory) => {
    if (currentCategory === "Shoulder bags") {
      return "<h1>Upcycled Denim Bags</h1><p>Carry sustainability with style. Our collection of upcycled denim bags turns reclaimed blue jeans into durable, one-of-a-kind fashion pieces. Each handmade bag features unique washing tones, original pocket details, and reinforced stitching designed for daily carry.</p><p>By transforming post-consumer denim into functional totes, shoulder bags, and crossbody purses, every purchase supports eco-friendly fashion and keeps quality textiles out of landfills. Explore our handcrafted collection to find a truly unique piece that blends utility, durability, and sustainable craftsmanship.</p>";
    } else if (currentCategory === "Keychains") {
      return "<h1>Ukraine Trident Keychains</h1><p>A Meaningful Gift for a Greater Cause A keychain is more than just a tool to keep your keys organized - it's a conversation starter. Our Ukraine Trident keyrings make thoughtful, patriotic gifts for friends, family, and members of the community. It's a small way to show big support and keep a piece of your heritage close at hand. Explore our range of materials and finishes below to find the perfect Tryzub symbol to carry with you.</p><p><strong>Every cent of the proceeds from this keychain goes directly to support Ukrainian relief efforts. 100% donation. 100% solidarity.</strong></p>";
    } else if (currentCategory === "Decor") {
      return "<h1>Personalized Decor</h1><p>The Magic of Personalization There is something special about seeing your name or a custom design beautifully etched into your holiday or home accents. Using precision laser engraving, we bring a high level of detail to our decor items. Whether it's our popular personalized Christmas stockings or custom seasonal ornaments, these pieces are designed to be part of your family's traditions for years to come.</p>";
    } else if (currentCategory === "Aprons") {
      return "<h1>Durable Aprons</h1><p>Durability in Every Stitch We moved away from thin, mass-produced fabrics to focus on heavy-duty denim and high-quality canvas. Denim is a legendary fabric for a reason—it's tough, it's washable, and it only gets better with age. Whether you are dealing with art supplies, gardening tools, or classroom essentials, these aprons offer a rugged shield that stands up to real-world wear and tear.</p>";
    } 
  }

  return (
    <>
        <nav className="shop-nav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {categories.map((category, index) => (
                    (() => {
                        const isActiveClass = (category === currentCategory) ? "active" : "";
                        return (
                        <li key={index}>
                            <Link className={isActiveClass} to={`/collection/${category}`}>{category}</Link>
                        </li>
                        )
                    })()
                ))}
            </ul>
        </nav>
        <div className="category-story">
            <div dangerouslySetInnerHTML={{ __html: story(currentCategory) }}></div>
        </div>
    </>
  )
}

export default CategoryNav
