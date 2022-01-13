import React from 'react';
import './App.css';
import {Route, BrowserRouter, Routes} from "react-router-dom"
import Product from './Components/Product/Product';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Product/>} />
        </Routes>
        <Routes>
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
        <Routes>
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    </div>
  );
}

export default App;
