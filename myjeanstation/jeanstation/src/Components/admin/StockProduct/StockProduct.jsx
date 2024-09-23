import React, { useState } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import './StockProduct.css'; // Import the CSS file

const StockProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { image } = location.state;

  console.log("ProductId:", productId);
  console.log("Image:", image);

  const [stockDetails, setStockDetails] = useState({
    colour: '',
    S: '',
    M: '',
    L: '',
    XL: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stockProductData = {
      productId: productId,
      ...stockDetails
    };
    
    axios.post('http://localhost:5128/api/StockProduct', stockProductData)
      .then(response => {
        console.log("Stock product added:", response.data);
        alert("Successful");
        setStockDetails({
          colour: '',
          S: '',
          M: '',
          L: '',
          XL: ''
        });
      })
      .catch(error => {
        console.error("Error adding stock product:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="my-4">Stock Product for Product ID {productId}</h1>
      <div className="row">
        <div className="col-md-6">
          <img 
            src={image} 
            alt="Product" 
            style={{ 
              maxHeight: '300px', 
              width: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Colour</label>
              <input 
                type="text" 
                className="form-control" 
                name="colour" 
                value={stockDetails.colour} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>S</label>
              <input 
                type="number" 
                className="form-control" 
                name="S" 
                value={stockDetails.S} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>M</label>
              <input 
                type="number" 
                className="form-control" 
                name="M" 
                value={stockDetails.M} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>L</label>
              <input 
                type="number" 
                className="form-control" 
                name="L" 
                value={stockDetails.L} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>XL</label>
              <input 
                type="number" 
                className="form-control" 
                name="XL" 
                value={stockDetails.XL} 
                onChange={handleChange} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockProduct;
