import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import useFetchData from './fetcher';
import GADataLayer from './ga';

const DisplayItem = () => {
  const { id } = useParams();
  const fetchUrl = '/data.json';
  const [fetch, setFetch] = useState(fetchUrl);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    // Fetch data.
    useFetchData(fetch, setData, setLoading);
  }, []);

  useEffect(() => {
    // Set item based on id.
    if (data.items && data.items.length > 0) {
      setItem(data.items.find((item) => item.id == id));
    }
  }, [data]);

  useEffect (() => {
    if (item.id) {
      // GA menu tracking.
      GADataLayer({
        event: 'item_view',
        item: {
          'id': item.id,
          'name': item.name,
          'sold': item.sold,
          'price': item.price
        }
      });
    }
  }, [item]);
   
  
  return (
    <>
    {(!loading && item.name) && (
      <div className="display-item">
        <div className="gallery">
          {item.images.map((image, index) => (
            <div key={index}>
              <img src={`../../${image}`} alt={`${item.name} - ${item.id}`} />
            </div>
          ))}
        </div>

        <h2>
          {item.name}
          {(item.sold == 1) && <div className="sold"> - Sold</div>}
          {(item.description) && <div className="description">{item.description}</div>}
        </h2>
        {(item.paypal && item.sold !=1) && <div className="paypal-button"><a href={item.paypal}>Purchase</a></div>}
        
      </div>
    )}
  </>
  );
}

export default DisplayItem;