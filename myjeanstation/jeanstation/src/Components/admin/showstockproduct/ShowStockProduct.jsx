import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowStockProduct.css'; // Import the CSS file

const ShowStockProduct = () => {
  const [stockProducts, setStockProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5128/api/StockProduct')
      .then(response => {
        console.log("Fetched stock products:", response.data);
        setStockProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching stock products:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Stock Products</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Colour</th>
            <th>S</th>
            <th>M</th>
            <th>L</th>
            <th>XL</th>
          </tr>
        </thead>
        <tbody>
          {stockProducts.length > 0 ? (
            stockProducts.map(stockProduct => (
              <tr key={stockProduct.id}>
                <td>{stockProduct.id}</td>
                <td>{stockProduct.productId}</td>
                <td>{stockProduct.colour}</td>
                <td>{stockProduct.s}</td>
                <td>{stockProduct.m}</td>
                <td>{stockProduct.l}</td>
                <td>{stockProduct.xl}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No stock products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowStockProduct;
