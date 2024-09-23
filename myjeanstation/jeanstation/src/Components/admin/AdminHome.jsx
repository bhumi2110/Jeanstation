import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = () => {
    axios.get('http://localhost:5128/api/Store')
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error('Error fetching stores:', error);
      });
  };

  const handleStoreClick = (storeId) => {
    navigate(`/admin/showproduct/${storeId}`);
  };

  const handleAddProductClick = (storeId) => {
    navigate(`/admin/addproduct/${storeId}`);
  };

  const handleAddStoreClick = () => {
    navigate('/admin/addstore');
  };

  return (
    <div className="container mt-5">
      <h1>Admin Home</h1>
      <div className="row">
        {stores.map(store => (
          <div className="col-md-4" key={store.id}>
            <div className="card mb-4" style={{ cursor: 'pointer' }} onClick={() => handleStoreClick(store.id)}>
              <img src={store.image} className="card-img-top" alt={store.location} />
              <div className="card-body">
                <h5 className="card-title">{store.location}</h5>
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleAddProductClick(store.id); }}>Add Product</button>
              </div>
            </div>
          </div>
        ))}
        <div className="col-md-4">
          <div className="card mb-4 d-flex align-items-center justify-content-center" style={{ height: '100%', cursor: 'pointer' }} onClick={handleAddStoreClick}>
            <div className="text-center">
              <div className="circle">
                <span className="plus-symbol">+</span>
              </div>
              <p>Add Store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
