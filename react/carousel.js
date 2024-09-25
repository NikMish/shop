import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './scss/carousel.scss';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function Carousel(props) {
  console.log(props.item);
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="item-gallery"
      >
        {props.item.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={props.item.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}


// {data.items.map((item, index) => (
//   <SwiperSlide key={index}>
//       <a className="item" href="aprons/">
//         <div className="item-image" style={{backgroundImage: `url('${item.image}')`}}>
//         </div>
//         <div className="item-description">
//           <h2>{item.name}</h2>
//         </div>
//         <div className="item-price">
//         {item.price}
//         </div>
//       </a>
//   </SwiperSlide>
// ))}