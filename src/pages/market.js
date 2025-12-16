import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const MarketPage = ({ path }) => {
    const siteTitle = "Misharev: Market"
    return (
        <Layout currentPath={path} title={siteTitle}>
            <div className="market-page content">
                <h2>Upcycle Your Style</h2>

                <p>Give your wardrobe a sustainable boost with our unique, upcycled denim aprons and bags. Each piece is handcrafted from discarded jeans, reducing fashion waste and adding a touch of vintage charm to your everyday style.</p>

                <p><strong>Perfect for:</strong></p>
                <ul>
                    <li>Home chefs</li>
                    <li>Gardeners</li>
                    <li>Artists</li>
                    <li>Fashion-forward individuals</li>
                </ul>

                <h3>Grab your stylish, eco-friendly apron or a bag!</h3>


                <p>Thank you for supporting handmade and sustainable living!</p>


                <div className="paypal">
                    <h3>Can't pay with cash? No problem!</h3>
                    <form action="https://www.paypal.com/ncp/payment/CS5MYNJT3ZXH6" method="post" target="_top" style={{ display: 'inline-grid', justifyItems: 'center', alignContent: 'start', gap: '0.5rem' }}>
                        <input className="pp-CS5MYNJT3ZXH6" type="submit" value="Pay Now" />
                        <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
                        <section> Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style={{height: '0.875rem', verticalAlign: 'middle'}} /></section>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Market" />

export default MarketPage
