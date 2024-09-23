import React, { useState } from 'react';
import axios from 'axios';

const AddStore = ({ fetchStores }) => {
  const [newStore, setNewStore] = useState({
    Location: '',
    Image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore({ ...newStore, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5128/api/Store', newStore)
      .then(() => {
        fetchStores(); 
        setNewStore({ Location: '', Image: '' }); 
      })
      .catch(error => {
        console.error('Error adding store:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="mb-3">
        <label className="form-label">Location:</label>
        <input
          type="text"
          name="Location"
          className="form-control"
          value={newStore.Location}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image URL:</label>
        <input
          type="text"
          name="Image"
          className="form-control"
          value={newStore.Image}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Store</button>
    </form>
  );
};

export default AddStore;
