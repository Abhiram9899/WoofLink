import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="container">
        <h1>Pet Caretaker</h1>
        <div>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
          <NavLink to="/bookings" className={({ isActive }) => isActive ? 'active' : ''}>Book Now</NavLink>
          <NavLink to="/my-bookings" className={({ isActive }) => isActive ? 'active' : ''}>My Bookings</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;