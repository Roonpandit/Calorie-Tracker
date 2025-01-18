import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../Css/Scanner.css"; // Import the CSS file
import Nav_1 from "./Nav_1";
const Scanner = () => {
  const scannerRef = useRef(null);
  const [decodedText, setDecodedText] = useState("");
  const [error, setError] = useState("");
  const [scannerActive, setScannerActive] = useState(true); // State to control scanner visibility

  // Function to start the scanner
  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (text) => {
        setDecodedText(text);
        setError("");  // Clear error when scan is successful
        setScannerActive(false); // Deactivate the scanner after scanning
        scanner.clear(); // Clear scanner to stop continuous scanning
      },
      (scanError) => {
        setDecodedText(""); // Clear the decoded text if error occurs
        setError(`Scanning error: "No Code Found"`);
      }
    );

    scannerRef.current = scanner;
  };

  // Initialize scanner when the component mounts or scannerActive changes
  useEffect(() => {
    if (scannerActive) {
      startScanner(); // Start the scanner
    }

    return () => {
      scannerRef.current.clear().catch((clearError) => console.error(clearError));
    };
  }, [scannerActive]); // Re-run effect when scannerActive state changes

  // Handle the "Scan Again" button click
  const handleScanAgain = () => {
    setDecodedText(""); // Clear decoded text
    setError(""); // Clear any error messages
    setScannerActive(true); // Re-activate the scanner
  };

  return (
    <>
    <Nav_1/>
        <div className="scanner-container">
      <h1 className="scanner-title">QR Code Scanner</h1>
    
      <div id="reader"></div>

    </div>
    </>

  );
};

export default Scanner;
