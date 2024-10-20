


import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';

function App() {
  const [visitorDetails, setVisitorDetails] = useState({
    name: '',
    purpose: '',
    hostName: '',
  });
  const [showQR, setShowQR] = useState(false);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisitorDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowQR(true);
  };

  const handleNewVisitor = () => {
    setVisitorDetails({ name: '', purpose: '', hostName: '' });
    setShowQR(false);
  };

  const visitorPassUrl = `${window.location.origin}/visitor-pass.html?` + 
  `name=${encodeURIComponent(visitorDetails.name)}` +
  `&purpose=${encodeURIComponent(visitorDetails.purpose)}` +
  `&hostName=${encodeURIComponent(visitorDetails.hostName)}` +
  `&timestamp=${encodeURIComponent(new Date().toISOString())}`;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Estate Security App</h1>
        {!showQR ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="App-input"
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
              name="hostName"
              placeholder="Host Name"
              value={visitorDetails.hostName}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Generate QR Code</button>
          </form>
        ) : (
          <div className="result-page">
            <h2>Visitor Pass</h2>
            <div className="visitor-details">
              <p><strong>Name:</strong> {visitorDetails.name}</p>
              <p><strong>Purpose:</strong> {visitorDetails.purpose}</p>
              <p><strong>Host:</strong> {visitorDetails.hostName}</p>
            </div>
            <div className="qr-code">
              <QRCodeSVG value={visitorPassUrl} size={200} />
            </div>
            <button onClick={handleNewVisitor}>New Visitor</button>
          </div>
        )}
          </header>
    </div>
  );
}

export default App;