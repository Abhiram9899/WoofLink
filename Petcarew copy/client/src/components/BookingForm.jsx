import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingForm() {
  const [pet, setPet] = useState({ name: '', type: '', age: '', instructions: '', photo: null });
  const [booking, setBooking] = useState({ street: '', city: '', zip: '', startDate: '', endDate: '', notes: '' });
  const navigate = useNavigate();

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleFileChange = (e) => {
    setPet({ ...pet, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in pet) formData.append(key, pet[key]);
    try {
      const petRes = await axios.post('http://localhost:5000/api/bookings/pets', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' },
      });
      await axios.post('http://localhost:5000/api/bookings', { ...booking, petId: petRes.data._id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/my-bookings');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Book a Pet Caretaker</h2>
      <form onSubmit={handleSubmit}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Pet Details</h3>
        <input
          type="text"
          name="name"
          value={pet.name}
          onChange={handlePetChange}
          placeholder="Pet Name"
          required
        />
        <input
          type="text"
          name="type"
          value={pet.type}
          onChange={handlePetChange}
          placeholder="Pet Type (e.g., Dog, Cat)"
          required
        />
        <input
          type="number"
          name="age"
          value={pet.age}
          onChange={handlePetChange}
          placeholder="Pet Age"
          required
        />
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          accept="image/*"
        />
        <textarea
          name="instructions"
          value={pet.instructions}
          onChange={handlePetChange}
          placeholder="Special Instructions"
          style={{ height: '100px' }}
        />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Booking Details</h3>
        <input
          type="text"
          name="street"
          value={booking.street}
          onChange={handleBookingChange}
          placeholder="Street Address"
          required
        />
        <input
          type="text"
          name="city"
          value={booking.city}
          onChange={handleBookingChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="zip"
          value={booking.zip}
          onChange={handleBookingChange}
          placeholder="ZIP Code"
          required
        />
        <input
          type="date"
          name="startDate"
          value={booking.startDate}
          onChange={handleBookingChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={booking.endDate}
          onChange={handleBookingChange}
          required
        />
        <textarea
          name="notes"
          value={booking.notes}
          onChange={handleBookingChange}
          placeholder="Additional Notes"
          style={{ height: '100px' }}
        />
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;
