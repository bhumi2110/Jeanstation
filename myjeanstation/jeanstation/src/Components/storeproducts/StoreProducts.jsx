import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './StoreProducts.css'; 

const StoreProducts = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [storeId]);

  const fetchProducts = () => {
    axios.get(`http://localhost:5128/api/Product/${storeId}`)
      .then(response => {
        console.log("Fetched products:", response.data); 
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  const fetchProductsByGender = (gender) => {
    console.log(`Fetching products for gender: ${gender}`);
    axios.get(`http://localhost:5128/api/Product/Gender/${gender}`)
      .then(response => {
        console.log(`Fetched ${gender} products:`, response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error(`Error fetching ${gender} products:`, error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const StockProductHandler = (product) => {
    navigate(`/productdescription/${product.code}`, { 
      state: { 
        image: product.image, 
        id: product.code, 
        gender: product.gender, 
        description: product.description, 
        price: product.price,
        name:product.name
      } 
    });
  };

  return (
    <div className="container">
      <h1 className="my-4">Products in Store {storeId}</h1>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search by product name" 
          className="form-control mb-2" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button 
          className="btn btn-secondary me-2" 
          onClick={() => fetchProductsByGender('Women')}
        >
          Women
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => fetchProductsByGender('Men')}
        >
          Men
        </button>
        <button 
          className="btn btn-secondary ms-2" 
          onClick={fetchProducts}
        >
          Clear Filter
        </button>
      </div>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div 
              className="col-md-4" 
              key={product.code} 
              style={{ cursor: 'pointer' }}
            >
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
                  <p className="card-text">{product.price}</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => StockProductHandler(product)}
                  >
                    View
                  </button>
                </div>
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

export default StoreProducts;
