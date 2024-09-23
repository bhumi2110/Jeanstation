import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ShowProduct.css'; // Import the CSS file

const ShowProduct = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);

  const StockProductHandler = (product) => {
    navigate(`/admin/stockproduct/${product.code}`, { state: { image: product.image } });
  };

  useEffect(() => {
    axios.get(`http://localhost:5128/api/Product/${storeId}`)
      .then(response => {
        console.log("Fetched products:", response.data); 
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, [storeId]);

  return (
    <div className="container">
      <h1 className="my-4">Products in Store {storeId}</h1>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div className="col-md-4" key={product.code}>
              <div className="card mb-4 custom-card">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ 
                    maxHeight: '150px', 
                    width: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {product.price}</p>
                  <p className="card-text">Description: {product.description}</p>
                  <p className="card-text">Gender: {product.gender}</p>
                </div>
                <button onClick={() => StockProductHandler(product)}>View</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this store.</p>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
