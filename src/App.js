import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import './App.css';
import React , {useEffect} from 'react'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import Profilescreen from './screens/Profilescreen';

function App() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    <div className="App">
     {/* <h1>CIY</h1>
     <button className='btn btn-primary'>Get Started</button> */}
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/home' exact element={<Homescreen/>} />
    <Route path="/book/:id" exact element={<Bookingscreen/>} />
    <Route path="/register" exact element={<Register/>} />
    <Route path="/login" exact element={<Loginscreen/>} />
    <Route path="/" exact element={<Landingscreen/>} />
    <Route path="/admin" exact element={<Adminscreen/>} />
    <Route path="/profile" exact element={<Profilescreen/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
