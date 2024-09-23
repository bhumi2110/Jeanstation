import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stores from './Components/stores/Stores';
import StoreProducts from './Components/storeproducts/StoreProducts';
import ProductDescription from './Components/productdescription/ProductDescription';
import NavBar from './Components/Navbar/NavBar';
import './App.css';
import Adminlayout from './Adminlayout';
import SignUp from './Components/signup/SignUp';
import SignIn from './Components/signin/SignIn';
import LogOut from './Components/logout/LogOut';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Stores />} />
          <Route path="/storeproducts/:storeId" element={<StoreProducts />} />
          <Route path="/productdescription/:productId" element={<ProductDescription />} />
    
<Route path="/signup" element={<SignUp/>}/>
<Route path="/signin" element={<SignIn/>}/>
<Route path="/logout" element={<LogOut/>}/>
          </Routes>
        <Adminlayout/>
      </Router>
    </div>
  );
}
export default App;
