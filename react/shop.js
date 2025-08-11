import React, {useEffect, useState} from 'react';
import useFetchData from './fetcher';
import Filter from './filter';
import { Link } from 'react-router-dom';

import './scss/style.scss';


const ShopApp = () => {
  const fetchUrl = 'data.json';
  const [fetch, setFetch] = useState(fetchUrl);
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState({});

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '80%',
      height: '80%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  useEffect(() => {
    useFetchData(fetch, setData, setLoading);
  }, []);

  useEffect(() => {
    if (data.items && data.items.length > 0) {
      setItems(data.items);
    }
  }, [data]);

  return (
    <div className='shop-app'>
    {loading && <div>Loading...</div>}
    <>
      <Filter data={data} setItems={setItems} items={items} />
      {(!loading && items && items.length > 0) && (
        <div className='shop-gallery'>
          {items.sort((a, b) => a.id > b.id ? 1 : -1).sort((a, b) => a.sold > b.sold ? 1 : -1).map((item, index) => (
            <div key={index}>
              <Link to={`/shop/item/${item.id}`}>
                <div className="item-image" style={{backgroundImage: `url('${item.images[0]}')`}}>
                  {(item.sold == 1) && <div className="sold">Sold</div>}
                </div>
                <div className="item-name">
                  {item.name}
                </div>
              </Link>
              <div className="item-price">
              $ {item.price}
                {(item.paypal && item.sold != 1) && <div className="paypal-button"><a href={item.paypal}>Purchase</a></div>}
              </div>
            </div>  
          ))}
        </div>
      )}
    </>
    </div>
  );
};

export default ShopApp;