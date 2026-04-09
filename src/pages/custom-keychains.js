import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ShippingPage = ({ location }) => {
    const siteTitle = "Misharev: Your Design, Our Laser - Custom Keychains"
    return (
        <Layout location={location} title={siteTitle}>
            <div className="shipping-page content">
                <h2>Custom Crafted for You</h2>
                <p>From "funky" geometric reimagining of classic logos to personalized text and intricate botanical patterns, we bring your vision to life. These keychains make for perfect meaningful gifts or a distinctive way to brand your own daily carry. Every order supports our commitment to upcycled materials and humanitarian efforts, ensuring that your custom piece looks good and does good.</p>

                <h3>Ready to create your custom keychain?</h3>
                <p>To get started, simply click the button below to send us an email. To ensure the best results for your laser-engraved piece, please include the following details in your message:</p>
                <ul>
                    <li>Your Choice of Color: Let us know if you’d like Tan, Slate Gray, Rustic Brown, or Midnight Black PU Leather.</li>
                    <li>The Shape: Specify if you prefer a Circular or Rectangular keychain.</li>
                    <li>The Design: Tell us what you’d like engraved (Text, a Name, or a specific Graphic).</li>
                </ul>
                <h4>Important: Don't forget to attach your file!</h4>
                <p>For the cleanest, sharpest engraving, please attach your design as a high-resolution PNG (Black & White) or an SVG vector file. If you're sending a logo (like a "funky" VW design), make sure it has clear lines and no gradients.</p>

                <p>
                    <a className="button" href="mailto:misharev+shop@gmail.com.com?subject=Custom PU Leather Keychain Request&body=Hi! I'd like to order a custom keychain. %0D%0A%0D%0AName: %0D%0APU Leather Color (Tan, Gray, Brown, Black): %0D%0AShape (Rectangle/Circle): %0D%0A%0D%0A**Please remember to attach your logo or design file to this email!**">
                        Send My Design Request
                    </a>
                </p>

                <h4>Example:</h4>
                <p>
                    <img className="content-image" src="../images/custom-keychain-puleather.jpeg" alt="Example of a custom keychain design" />
                </p>

            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Custom Keychains" />

export default ShippingPage
