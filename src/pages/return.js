import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ReturnPage = ({ location }) => {
    const siteTitle = "Misharev: Return & Exchange Policy"
    return (
        <Layout location={location} title={siteTitle}>
            <div className="return-page content">
                <h2>Our Commitment to Quality</h2>
                <p>At Misharev, every item is handcrafted with care, and our upcycled denim pieces are designed to be as unique as the people who carry them. Because of the handmade and one-of-a-kind nature of our products, <strong>we only accept returns or exchanges for items that arrive damaged or defective.</strong></p>
               
                <h3>Damaged or Defective Items</h3>
                <p>If your order arrives damaged during shipping or has a structural defect, we want to make it right.</p>
                <ul>
                    <li>Please contact us at <a href="mailto:misharev@hotmail.com">misharev@hotmail.com</a> within 7 days of receiving your package.</li>
                    <li>Include your order number and clear photos of the damage or defect.</li>
                    <li>Once we verify the issue, we will offer you a replacement (if the item is not a one-of-a-kind piece) or a full refund.</li>
                </ul>

                <h3>A Note on Upcycled Materials</h3>
                <p>Please keep in mind that our bags are made from upcycled denim. Natural variations in fabric color, light distressing, or "lived-in" characteristics are part of the charm and history of the material and are not considered defects. We do our best to photograph every item accurately so you know exactly what to expect.</p>

                <h3>Personalized & Custom Orders</h3>
                <p>Items that have been personalized (such as laser-engraved stockings or custom-named keychains) cannot be returned or exchanged unless there is an error on our part or the item is damaged upon arrival.</p>

                <h3>How to Start a Return for Damage</h3>
                <ul>
                    <li>Email us at <a href="mailto:misharev@hotmail.com">misharev@hotmail.com</a> with your photos.</li>
                    <li>If a return is approved, we will provide you with a return shipping label.</li>
                    <li>Pack the item securely and send it back to us within 14 days of receiving the return label.</li>
                    <li>Once we receive and inspect the item, your refund will be processed to your original payment method.</li>
                </ul>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Return & Exchange Policy" />

export default ReturnPage
