import * as React from "react"

const PaypalButton = ({ppId}) => {
    const tackClick = (e) => {
        e.preventDefault();
        console.log("PayPal button clicked", e);

        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: "paypal_button_click",
                // You can add additional data/parameters here
                category: "Engagement",
                label: "PayPal Clicked",
                value: 1,
            });
            console.log("Pushing PayPal click event to dataLayer", window.dataLayer);
        }
        
    }

    console.log("Rendering PayPalButton with ppId:", ppId);

  return (
    <div className="paypal-button">
        <a href={ppId} rel="noopener noreferrer" onClick={tackClick}>Pay with PayPal</a>
    </div>
  )
}

export default PaypalButton
