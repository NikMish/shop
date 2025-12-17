import * as React from "react"

const PaypalButton = ({item}) => {
    const tackClick = () => {

        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: "paypal_button_click",
                // You can add additional data/parameters here
                item_name: item.name,
                item_price: item.price,
            });
        }
        
    }

  return (
    <div className="paypal-button">
        <a href={item.paypal} rel="noopener noreferrer" onClick={tackClick}>Pay with PayPal</a>
    </div>
  )
}

export default PaypalButton
