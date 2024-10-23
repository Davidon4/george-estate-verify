import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../firebase';

interface VisitorDetails {
    name: string;
    purpose: string;
    destination: string;
    date: number;
    time: number;
    uniqueCode: string;
  }

const CodeVerification = () => {
  const [enteredCode, setEnteredCode] = useState('');
  const [visitorDetails, setVisitorDetails] = useState<VisitorDetails | null>(null);
  const [error, setError] = useState('');

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Query Firestore to find the visitor by uniqueCode
      const q = query(collection(firestore, 'visitors'), where('uniqueCode', '==', enteredCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a matching document is found, set the visitor details
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            setVisitorDetails(data as VisitorDetails); 
        });
        setError('');
      } else {
        setError('No visitor found with that unique code');
        setVisitorDetails(null);
      }
    } catch (err) {
      console.error('Error verifying code: ', err);
      setError('An error occurred while verifying the code');
    }
  };

  return (
    <div className="container">
      <h1>Verify Visitor Code</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Unique Code"
          value={enteredCode}
          onChange={handleCodeInputChange}
          required
        />
        <button type="submit">Verify Code</button>
      </form>

      {error && <p>{error}</p>}

      {visitorDetails && (
        <div className="visitor-details">
          <h2>Visitor Details</h2>
          <p><strong>Name:</strong> {visitorDetails.name}</p>
          <p><strong>Purpose:</strong> {visitorDetails.purpose}</p>
          <p><strong>Destination:</strong> {visitorDetails.destination}</p>
          <p><strong>Date:</strong> {visitorDetails.date}</p>
          <p><strong>Time:</strong> {visitorDetails.time}</p>
        </div>
      )}
    </div>
  );
};

export default CodeVerification;