import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/bookings');
      } else {
        throw new Error('No token received from server');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || err.message || 'An error occurred during registration';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Register</h2>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: loading ? '#cccccc' : '#4CAF50', color: 'white', border: 'none' }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#4CAF50' }}>Login</Link>
      </p>
    </div>
  );
}

export default Register;