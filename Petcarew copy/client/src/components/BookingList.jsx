import { useState, useEffect } from 'react';
import axios from 'axios';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBookings(res.data);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>My Bookings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {bookings.map((booking) => (
          <div key={booking._id} className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {booking.petId.name} ({booking.petId.type})
            </h3>
            <p>Address: {booking.address.street}, {booking.address.city}, {booking.address.zip}</p>
            <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
            <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Status: {booking.status}</p>
            {booking.petId.photo && (
              <img
                src={`http://localhost:5000/${booking.petId.photo}`}
                alt={booking.petId.name}
                style={{ width: '128px', height: '128px', objectFit: 'cover', marginTop: '0.5rem' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;