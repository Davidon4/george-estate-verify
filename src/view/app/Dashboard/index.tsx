import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../../AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { Navigate } from 'react-router-dom';
import "./styles.css";

const Dashboard = () => {
  const user = useContext(AuthContext);
  const [visitorDetails, setVisitorDetails] = useState({
    name: '',
    purpose: '',
    destination: '',
    date: '',
    time: '',
  });
  const [showResult, setShowResult] = useState<boolean>(false);
  const [uniqueCode, setUniqueCode] = useState<string>('');

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setVisitorDetails(prev => ({ ...prev, [name]: value }));
  };

  // Function to generate a random alphanumeric string
  const generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let newCode = '';
      newCode = generateUniqueCode();
      setUniqueCode(newCode);

      const visitorData = {
        ...visitorDetails,
        uniqueCode: newCode,
      };
      try {
        await addDoc(collection(firestore, 'visitors'), visitorData);
        setShowResult(true);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
  };

  const handleNewVisitor = () => {
    setVisitorDetails({ name: '', purpose: '', destination: '', date: '', time: '' });
    setShowResult(false);
    setUniqueCode('');
  };

  if(!user) {
    return <Navigate replace to="/sign-in"/>
  }

  return (
    <div className="container">
      <header className="content-header">
        {!showResult ? (
          <form onSubmit={handleSubmit}>
            <h1>Crescent Verify</h1>
            <input
              type="text"
              name="name"
              placeholder="Visitor Name"
              value={visitorDetails.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="purpose"
              placeholder="Purpose of Visit"
              value={visitorDetails.purpose}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={visitorDetails.destination}
              onChange={handleInputChange}
              required
            />
            <input
              type="time"
              name="time"
              placeholder="Time of Visit"
              value={visitorDetails.time}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Date of Visit"
              value={visitorDetails.date}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Generate</button>
          </form>
        ) : (
          <div className="result-page">
            <h2>Visitor Pass</h2>
            <div className="visitor-details">
              <p><strong>Name of Visitor:</strong> {visitorDetails.name}</p>
              <p><strong>Purpose of Visit:</strong> {visitorDetails.purpose}</p>
              <p><strong>Destination of Visit:</strong> {visitorDetails.destination}</p>
              <p><strong>Date of Visit:</strong> {visitorDetails.date}</p>
              <p><strong>Timeframe of Visit:</strong> {visitorDetails.time}</p>
            </div>
              <p><strong>Unique Code:</strong> {uniqueCode}</p>

            <button onClick={handleNewVisitor}>New Visitor</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Dashboard;