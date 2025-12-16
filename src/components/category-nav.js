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

  return (
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
  )
}

export default CategoryNav
