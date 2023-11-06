import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../App.css';

import Cables from '../Images/Cables.jpg';
import Charger from '../Images/Charger';
import Computer from '../Images/Desktop Computer.jpg';
import Camera from '../Images/Digital Camera.jpg';
import Dishwasher from '../Images/Dishwasher.webp';
import Player from '../Images/DVD Player.jpg';
import Earphones from '../Images/Earphones.webp';
import Console from '../Images/Gaming Console.jpeg';
import Speaker from '../Images/Home Theatre.jpg';
import Laptops from '../Images/Laptops.jpg';
import Microwave from '../Images/Microwave.webp';
import Printer from '../Images/Printer.jpg';
import Refrigerators from '../Images/Refrigerators.jpg';
import Smartphone from '../Images/Smartphone.avif';
import Tablets from '../Images/Tablets.avif';
import Machine from '../Images/Washing Machine.webp';

function Dashboard() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isDeletePopUpOpen,setIsDeletePopUpOpen] = useState(false);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };
  const openDeletePopUp = () => {
    setIsDeletePopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    window.location.reload(); // Refresh the page
  };

  useEffect(() => {
    // Make an HTTP request to get data from the server
    fetch('http://localhost:5000/addEmail/getauthenticate')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    // Fetch item data for all items at once
    const itemPromises = data.map((item) =>
      axios.get(`http://localhost:5000/addEmail/getitem/${item._id}`)
    );

    Promise.all(itemPromises)
      .then((responses) => {
        const itemData = responses.map((response) => response.data.item);
        setItemData(itemData);
      })
      .catch((error) => console.error('Error fetching item data:', error));
  }, [data]);

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/addEmail/acceptCard/${id}`);
      console.log(`Accepted card with ID: ${id}`);
      console.log('Response:', response.data);
      openPopUp();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/addEmail/deleteCard/${id}`);
      console.log(`Canceled card with ID: ${id}`);
      console.log('Response:', response.data);
      openDeletePopUp();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <h1>Data in Card View</h1>
      <div className='card-view'>
        {data.map((item, index) => (
          <Card key={item._id}>
            <CardContent className='card-content'>
            <img
                src={getImageForItem(itemData[index])}
                alt={`Image for Item ID ${item._id}`}
              />
              <p>Id: {item._id.slice(-3)}</p>
              <p>Email: {item.email}</p>
              <p>Item: {item.item}</p>
              <p>Count: {item.count}</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAccept(item._id)}
                className='card-button'
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancel(item._id)}
                className='card-button'
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>  
      {isPopUpOpen && (
        <div className="no-data-popup">
          <p>Product Accepted Successfully</p>
          <button onClick={closePopUp}>Close</button>
        </div>
      )}
      {isDeletePopUpOpen && (
        <div className="no-data-popup">
          <p>Product Deleted Successfully</p>
          <button onClick={closePopUp}>Close</button>
        </div>
      )}
    </>
  );
}

function getImageForItem(item) {
  // Implement logic to map item to the correct image URL here
  // For example, if item is "Charger," return Charger image URL
  switch (item) {
    case 'Charger':
      return Charger;
    case 'Desktop Computer':
      return Computer;
    case 'Digital Camera':
      return Camera;
    case 'Cables':
      return Cables;
    case 'Dishwasher':
      return Dishwasher;
    case 'DVD Player':
      return Player;
    case 'Earphones':
      return Earphones;
    case 'Console':
      return Console;
    case 'Home Theatre':
      return Speaker;
    case 'Laptops':
      return Laptops;
    case 'Microwave':
      return Microwave;
    case 'Printer':
      return Printer;
    case 'Refrigerators':
      return Refrigerators;
    case 'Smartphone':
      return Smartphone;
    case 'Tablets':
      return Tablets;
    case 'Washing Machine':
      return Machine;
    // Add more cases as needed
    default:
      // Return a default image if the item doesn't match any specific case
      return "No Device"; // Provide the URL of the default image
  }
}


export default Dashboard;
