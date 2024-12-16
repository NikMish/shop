const GADataLayer = (props) => {
  if (window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(props);
  }
};

export default GADataLayer;