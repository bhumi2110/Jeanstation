import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Stores = () => {
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
    //alert('showproduct')
   navigate(`/storeproducts/${storeId}`);
  };
  return (
    <div className="row">
      {stores.map(store => (
        <div className="col-md-4" key={store.id}>
          <div className="card mb-4" style={{ cursor: 'pointer' }} onClick={() => handleStoreClick(store.id)}>
            <img src={store.image} className="card-img-top" alt={store.location} />
            <div className="card-body">
              <h5 className="card-title">{store.location}</h5>
             
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stores;
