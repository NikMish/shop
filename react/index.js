import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import ShopApp from './shop';
import About from './about';
import Navigation from './nav';
import PageNotFound from './404';

import './scss/style.scss';


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ShopApp />}  />
        <Route path="/shop" element={<ShopApp />}  />
        <Route path="/about" element={<About />}  />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};


const appRoot = document.getElementById('my-shop-app');
if (appRoot) {
  const root = ReactDOM.createRoot(appRoot);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};