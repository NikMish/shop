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

  const catTitle = categoryData && categoryData[0].title ? categoryData[0].title : currentCategory;
  const catStory = categoryData && categoryData[0].story ? categoryData[0].story : "";

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
          <h1>{catTitle}</h1>
          <div dangerouslySetInnerHTML={{ __html: catStory }}></div>
        </div>
    </>
  )
}

export default CategoryNav
