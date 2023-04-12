import React from 'react'
import { Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom'
import ProductListing from './ProductListing'
import ProductDetails from './ProductDetails'
import NotFound from './NotFound'

const ProductRouting = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<ProductListing/>} />
                <Route path='/products/:id' element={<ProductDetails/>} />
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default ProductRouting