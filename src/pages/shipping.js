import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ShippingPage = ({ location }) => {
    const siteTitle = "Misharev: Shipping Policy"
    return (
        <Layout location={location} title={siteTitle}>
            <div className="shipping-page content">
                <h2>From Our Shop to Your Door - free</h2>
                <p>At Misharev, we want to make our handmade goods as accessible as possible. To keep our prices simple and transparent, we are proud to offer Free Shipping on all orders within the United States.</p>
               
                <h3>Processing Times</h3>
                <ul>
                    <li><strong>Ready-to-Ship Items:</strong> (e.g., non-personalized bags or keychains) typically ship within 1-3 business days.</li>
                    <li><strong>Personalized Items:</strong> (e.g., engraved stockings or custom keychains) require extra time for precision work. These typically ship within 3-5 business days.</li>
                    <li>During busy holiday seasons, processing times may increase. We will always notify you if there is a delay.</li>
                </ul>

                <h3>Shipping Method: USPS Standard (Untracked)</h3>
                <p>To provide free shipping for our customers, we utilize USPS Standard Mail.</p>

                <ul>
                    <li>Cost: Always FREE.</li>
                    <li>Delivery Estimate: Once dispatched, orders typically arrive within 5–10 business days, depending on your location and USPS transit times.</li>
                    <li>No Tracking: Please note that this economy shipping method does not include a tracking number. This allows us to offer shipping at no additional cost to you.</li>
                </ul>

                <h3>Delivery Expectations</h3>
                <p>Since this service is untracked, we ask for your patience as the postal service handles your delivery. Most orders arrive well within the estimated timeframe. If your order has not arrived after 14 business days from the date of your shipping confirmation email, please reach out to us at <a href="mailto:misharev@hotmail.com">misharev@hotmail.com</a>.</p>

                <h3>Address Accuracy</h3>
                <p>Please ensure your shipping address is 100% correct at checkout. Because there is no tracking to locate or reroute a package once it is in the USPS system, we cannot be responsible for items sent to an incorrectly provided address.</p>

                <h3>Lost or Delayed Mail</h3>
                <p>Misharev is responsible for getting your order into the hands of the USPS. However, once an item is mailed, we cannot control the speed of the postal service or be held liable for items lost in the mail. By choosing our free shipping option, you acknowledge that no tracking information will be provided.</p>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Shipping Policy" />

export default ShippingPage
