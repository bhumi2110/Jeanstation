import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddProduct = () => {
  const { storeId } = useParams();
  const [newProduct, setNewProduct] = useState({
    Name: '',
    Price: '',
    Image: '',
    Description: '',
    Gender: '',
    StoreId: storeId
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5128/api/Product', newProduct)
      .then(() => {
        setNewProduct({ Name: '', Price: '', Image: '', Description: '', Gender: '', StoreId: storeId }); // Reset the form
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="Name"
            className="form-control"
            value={newProduct.Name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="text"
            name="Price"
            className="form-control"
            value={newProduct.Price}
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
            value={newProduct.Image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            name="Description"
            className="form-control"
            value={newProduct.Description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <select
            name="Gender"
            className="form-control"
            value={newProduct.Gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
