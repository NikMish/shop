import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ThankYou = () => {
    const siteTitle = "Misharev: Thank you!"
    return (
        <Layout title={siteTitle}>
            <div className="about-page content">
                <h2>Thank you very much for your business!</h2>
                <p>Your order has been received and will be processed shortly.</p>

                <p>If you feel like you want to change it, please <a href="mailto:misharev@hotmail.com">email</a> me ASAP.</p>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="About Misharev Shop" />

export default ThankYou
