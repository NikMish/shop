import React, {useEffect, useState} from 'react';
import Navigation from './nav';
import useFetchData from './fetcher';
import Modal from 'react-modal';
import Carousel from './carousel';
import Filter from './filter';

import './scss/style.scss';


const ShopApp = () => {
  const fetchUrl = 'data.json';
  const [fetch, setFetch] = useState(fetchUrl);
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
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
  Modal.setAppElement('#my-shop-app');

  useEffect(() => {
    // Fetch data.
    // if (isReady) {
      useFetchData(fetch, setData, setLoading);
    // }
  }, []);

  useEffect(() => {
    if (data.items && data.items.length > 0) {
      setItems(data.items);
    }
  }, [data]);

  function openModal(item) {
    setCurrentItem(item);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='shop-app'>
    {loading && <div>Loading...</div>}
    <>
      <Navigation />
      <Filter data={data} setItems={setItems} items={items} />
      {(!loading && items && items.length > 0) && (
        <div className='shop-gallery'>
          {items.sort((a, b) => a.id < b.id ? 1 : -1).map((item, index) => (
            <a key={index} className="item" href="#"  onClick={() => openModal(item)}>
              <div className="item-image" style={{backgroundImage: `url('${item.images[0]}')`}}>
                {(item.sold == 1) && <div className="sold">Sold</div>}
              </div>
              <div className="item-description">
                <h2>{item.name}</h2>
              </div>
              <div className="item-price">
              $ {item.price}
                {(item.paypal) && <div className="paypal-button"><a href={item.paypal}>Purchase</a></div>}
              </div>
            </a>    
          ))}
        </div>
      )}
      {/* Modal content */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Overview"
      >
        <h2>
          {currentItem.name}
          {(currentItem.sold == 1) && <div className="sold"> - Sold</div>}
          {(currentItem.description) && <div className="description">{currentItem.description}</div>}
        </h2>
        <button className='close-modal' onClick={closeModal}>X</button>
        <Carousel item={currentItem} />
         {(currentItem.paypal) && <div className="paypal-button"><a href={currentItem.paypal}>Purchase</a></div>}
          
      </Modal>
    </>
    </div>
  );
};

export default ShopApp;