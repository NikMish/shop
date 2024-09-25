import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom/client";
import useFetchData from './fetcher';

import './scss/style.scss';


const ShopApp = () => {
  const fetchUrl = 'data.json';
  const [fetch, setFetch] = useState(fetchUrl);
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data.
    // if (isReady) {
      useFetchData(fetch, setData, setLoading);
      console.log('fetching data...');
    // }
  }, []);
  console.log(data);

  return (
    <div className='shop-app'>
    {loading && <div>Loading...</div>}
      <>
        {(!loading && data.items.length > 0) && (
          <div className='shop-gallery'>
            {data.items.map((item, index) => (
              <a key={index} className="item" href="aprons/">
                <div className="item-image" style={{backgroundImage: `url('${item.image}')`}}>
                </div>
                <div className="item-description">
                  <h2>{item.name}</h2>
                </div>
                <div className="item-price">
                {item.price}
                </div>
              </a>
            ))}
          </div>
        )}
      </>
    </div>
  );
};


const appRoot = document.getElementById('my-shop-app');
if (appRoot) {
  const root = ReactDOM.createRoot(appRoot);
  root.render(
    <React.StrictMode>
      <ShopApp />
    </React.StrictMode>
  );
};