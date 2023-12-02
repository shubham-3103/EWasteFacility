import React,{useState} from 'react'
import axios from 'axios';
import  Navbar  from '../Components/Navbar';
import '../App.css'

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
    <div className='full-form'>
      <div class="form">
        <h1 class="subtitle">Add Location</h1>
        <form onSubmit={handleSubmit}>
          <div class="input-container ic1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Place Name"
            />
          </div>

          <div class="input-container ic2">
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
            />
          </div>

          <div class="input-container ic2">
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
            />
          </div>

          <button type="submit" class="submit">Add Location</button>
        </form>
      </div>
      </div>
    </>
  )
};

export default AddLocation;