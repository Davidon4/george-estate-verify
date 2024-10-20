import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';

function App() {
  const [visitorDetails, setVisitorDetails] = useState({
    name: '',
    purpose: '',
    hostName: '',
  });
  const [showResult, setShowResult] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [generationOption, setGenerationOption] = useState('qr'); // "qr" for QR code, "code" for unique code

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisitorDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenerationOption(e.target.value);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (generationOption === 'code') {
      const newCode = generateUniqueCode(); // Generate unique code if selected
      setUniqueCode(newCode);
    }
    setShowResult(true); // Show the result based on the option selected
  };

  const handleNewVisitor = () => {
    setVisitorDetails({ name: '', purpose: '', hostName: '' });
    setShowResult(false);
    setUniqueCode(''); // Reset the unique code
    setGenerationOption('qr'); // Reset option to default QR code
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
        {!showResult ? (
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

            <div className="generation-options">
              <label>
                <input
                  type="radio"
                  value="qr"
                  checked={generationOption === 'qr'}
                  onChange={handleOptionChange}
                />
                Generate QR Code
              </label>
              <label>
                <input
                  type="radio"
                  value="code"
                  checked={generationOption === 'code'}
                  onChange={handleOptionChange}
                />
                Generate Unique Code
              </label>
            </div>

            <button type="submit">Generate</button>
          </form>
        ) : (
          <div className="result-page">
            <h2>Visitor Pass</h2>
            <div className="visitor-details">
              <p><strong>Name:</strong> {visitorDetails.name}</p>
              <p><strong>Purpose:</strong> {visitorDetails.purpose}</p>
              <p><strong>Host:</strong> {visitorDetails.hostName}</p>
            </div>

            {generationOption === 'qr' ? (
              <div className="qr-code">
                <QRCodeSVG value={visitorPassUrl} size={200} />
              </div>
            ) : (
              <p><strong>Unique Code:</strong> {uniqueCode}</p>
            )}

            <button onClick={handleNewVisitor}>New Visitor</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;