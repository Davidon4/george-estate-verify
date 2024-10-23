import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../../AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { Navigate } from 'react-router-dom';
import "./styles.css";

interface VisitorDetails {
  name: string;
  purpose: string;
  destination: string;
  date: number;
  time: number;
  uniqueCode: string;
}

const Dashboard = () => {
  const user = useContext(AuthContext);
  const [visitorDetails, setVisitorDetails] = useState({
    name: '',
    purpose: '',
    destination: '',
    date: '',
    time: '',
  });
  const [showResult, setShowResult] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [retrievedDetails, setRetrievedDetails] = useState<VisitorDetails | null>(null);

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

      // Store the visitor details along with the unique code in localStorage
      const visitorData = {
        ...visitorDetails,
        uniqueCode: newCode,
      };
      console.log('Submitting visitor data=>', visitorData);
      try {
        await addDoc(collection(firestore, 'visitors'), visitorData);
        setShowResult(true); // Show the result
      } catch (error) {
        console.error('Error adding document: ', error);
      }
  };

  const handleNewVisitor = () => {
    setVisitorDetails({ name: '', purpose: '', destination: '', date: '', time: '' });
    setShowResult(false);
    setUniqueCode(''); // Reset the unique code
  };

  const visitorPassUrl = `${window.location.origin}/visitor-pass.html?` +
    `name=${encodeURIComponent(visitorDetails.name)}` +
    `&purpose=${encodeURIComponent(visitorDetails.purpose)}` +
    `&destination=${encodeURIComponent(visitorDetails.destination)}` +
    `&date=${encodeURIComponent(visitorDetails.date)}` +
    `&time=${encodeURIComponent(visitorDetails.time)}` +
    `&timestamp=${encodeURIComponent(new Date().toISOString())}`;

  const handleCodeLookup = (e: any) => {
    e.preventDefault();
    // Retrieve visitor details from localStorage based on the entered unique code
    const storedDetails = localStorage.getItem(enteredCode);
    if (storedDetails) {
      setRetrievedDetails(JSON.parse(storedDetails));
    } else {
      setRetrievedDetails(null); // If no match, clear previous results
    }
  };

  if(!user) {
    return <Navigate replace to="/sign-in"/>
}

  return (
    <div className="container">
      <header className="content-header">
        <h1>Crescent Verify</h1>

        {!showResult ? (
          <form onSubmit={handleSubmit}>
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