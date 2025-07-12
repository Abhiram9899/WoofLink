import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookings" element={<BookingForm />} />
        <Route path="/my-bookings" element={<BookingList />} />
      </Routes>
    </Router>
  );
}

export default App;