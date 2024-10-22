import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';

interface VisitorDetails {
  name: string;
  purpose: string;
  hostName: string;
  uniqueCode: string;
}

function App() {
  const [visitorDetails, setVisitorDetails] = useState({
    name: '',
    purpose: '',
    hostName: '',
  });
  const [showResult, setShowResult] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [generationOption, setGenerationOption] = useState('qr'); // "qr" for QR code, "code" for unique code
  const [enteredCode, setEnteredCode] = useState('');
  const [retrievedDetails, setRetrievedDetails] = useState<VisitorDetails | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setVisitorDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (e: any) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let newCode = '';
    if (generationOption === 'code') {
      newCode = generateUniqueCode();
      setUniqueCode(newCode);

      // Store the visitor details along with the unique code in localStorage
      const storedData = {
        ...visitorDetails,
        uniqueCode: newCode,
      };
      localStorage.setItem(newCode, JSON.stringify(storedData));
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

        <div className="code-lookup">
          <h2>Lookup Visitor Details</h2>
          <form onSubmit={handleCodeLookup}>
            <input
              type="text"
              placeholder="Enter Unique Code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              required
            />
            <button type="submit">Lookup</button>
          </form>

          {retrievedDetails ? (
            <div className="visitor-details">
              <h3>Visitor Details</h3>
              <p><strong>Name:</strong> {retrievedDetails.name}</p>
              <p><strong>Purpose:</strong> {retrievedDetails.purpose}</p>
              <p><strong>Host:</strong> {retrievedDetails.hostName}</p>
              <p><strong>Code:</strong> {retrievedDetails.uniqueCode}</p>
            </div>
          ) : enteredCode && (
            <p>No visitor details found for this code.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;