import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import ShopApp from './shop';
import DisplayItem from './display-item';
import About from './about';
import Navigation from './nav';
import PageNotFound from './404';

import './scss/style.scss';


const App = () => {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<ShopApp />} />
        <Route path="/shop" element={<ShopApp />}  />
        <Route path="/shop/item/:id" element={<DisplayItem />}  />
        <Route path="/about" element={<About />}  />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
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