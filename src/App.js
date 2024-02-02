import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Single_product from './Single_product';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/product/:id" element={ <Single_product/> } />
        <Route path="/cart" element={ <Cart/> } />
      </Routes>
    </div>
  );
}

export default App;
