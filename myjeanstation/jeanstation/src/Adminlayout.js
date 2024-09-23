import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminHome from './Components/admin/AdminHome';
import AddProduct from './Components/admin/addproduct/AddProduct';
import AddStore from './Components/admin/addstore/AddStore';
import ShowStore from './Components/admin/showstore/ShowStore';
import ShowProduct from './Components/admin/showproduct/ShowProduct';
import StockProduct from './Components/admin/StockProduct/StockProduct';
import ShowStockProduct from './Components/admin/showstockproduct/ShowStockProduct';
// Import other admin components as needed

const Adminlayout = () => {
  return (
    <div className='Admin'>
        <Routes>
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/admin/addstore" element={<AddStore/>}/>
        <Route path="/admin/showstore" element={<ShowStore/>}/>
        <Route path="/admin/addproduct/:storeId" element={<AddProduct/>}/>
        <Route path="/admin/showproduct/:storeId" element={<ShowProduct/>}/>
        <Route path="/admin/stockproduct/:productId" element={<StockProduct/>}/>
        <Route path="/admin/showstockproduct" element={<ShowStockProduct/>}/>
        </Routes>
        
    </div>
  );
};
export default Adminlayout;
