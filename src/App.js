import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from "./components/Navbar";
import Cart from './pages/Cart'
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/customer/orders" element={<Orders/>} />
        <Route path="/customer/orders/:id" element={<Tracking/>} />
        <Route path="/admin/orders" element={<Admin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}
export default App;
