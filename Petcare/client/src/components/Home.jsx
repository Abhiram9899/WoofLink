import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Pet Caretaker</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
        Ensure your pets are in safe hands while you're away.
      </p>
      <Link to="/bookings" style={{
        display: 'inline-block',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        textDecoration: 'none'
      }}>
        Book Now
      </Link>
    </div>
  );
}

export default Home;