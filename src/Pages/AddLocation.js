import React,{useState} from 'react'
import axios from 'axios';
import  Navbar  from '../Components/Navbar';

const AddLocation = () => {
    const [formData, setFormData] = useState({
      name: '',
      latitude: '',
      longitude: '',
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/location', formData);
        console.log('Location added:', response.data);
        // Reset the form
        setFormData({
          name: '',
          latitude: '',
          longitude: '',
        });
      } catch (error) {
        console.error('Error adding location:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  return (
    <>
    <Navbar />
    <div>
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Location</button>
      </form>
    </div>
    </>
  )
};

export default AddLocation;