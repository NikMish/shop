import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const CategoryNav = ({currentCategory}) => {
    const data = useStaticQuery(
        graphql`
           {
                allDataJson(sort: {category: ASC}) {
                    distinct(field: {category: SELECT})
                }
            }
        `
      )

  const categories = data.allDataJson.distinct


  const story = (currentCategory) => {
    if (currentCategory === "Shoulder bags") {
      return "The Beauty of the \"Second Life\" Because we work with upcycled materials, no two bags are ever identical. Every pocket, seam, and shade of indigo tells a story of its previous life, giving you an accessory with a character that mass-produced bags simply can\’t match. Whether it\’s a patchwork messenger, a minimalist crossbody, or a bag adorned with custom embroidery, your Misharev bag is as unique as you are.";
    } else if (currentCategory === "Keychains") {
      return "A Meaningful Gift for a Greater Cause A keychain is more than just a tool to keep your keys organized - it\’s a conversation starter. Our Ukraine Trident keyrings make thoughtful, patriotic gifts for friends, family, and members of the community. It\’s a small way to show big support and keep a piece of your heritage close at hand. Explore our range of materials and finishes below to find the perfect Tryzub symbol to carry with you.";
    } else if (currentCategory === "Decor") {
      return "The Magic of Personalization There is something special about seeing your name or a custom design beautifully etched into your holiday or home accents. Using precision laser engraving, we bring a high level of detail to our decor items. Whether it\’s our popular personalized Christmas stockings or custom seasonal ornaments, these pieces are designed to be part of your family\’s traditions for years to come.";
    } else if (currentCategory === "Aprons") {
      return "Durability in Every Stitch We moved away from thin, mass-produced fabrics to focus on heavy-duty denim and high-quality canvas. Denim is a legendary fabric for a reason—it\’s tough, it\’s washable, and it only gets better with age. Whether you are dealing with art supplies, gardening tools, or classroom essentials, these aprons offer a rugged shield that stands up to real-world wear and tear.";
    } else if (currentCategory === "/Clutches") {
      return "Clutches";
    } else if (currentCategory === "/Wallets") {
      return "Wallets";
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
                            <Link className={isActiveClass} to={`/category/${category}`}>{category}</Link>
                        </li>
                        )
                    })()
                ))}
            </ul>
        </nav>
        <div className="category-story">
            <p>{story(currentCategory)}</p>
        </div>
    </>
  )
}

export default CategoryNav
