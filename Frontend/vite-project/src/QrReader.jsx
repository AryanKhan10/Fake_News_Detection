// QRReader.jsx
import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

// Path to the worker script
QrScanner.WORKER_PATH = "https://unpkg.com/qr-scanner/qr-scanner-worker.min.js";

const QRReader = () => {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (decodedText) => {
        setResult(decodedText.data);
        scanner.stop(); // Stop after first scan
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
      }
    );

    scannerRef.current = scanner;

    scanner
      .start()
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Camera error:", err);
        setError("Unable to access the camera. Please check permissions.");
        setLoading(false);
      });

    return () => {
      scanner.stop();
    };
  }, []);

  const handleRescan = () => {
    setResult("");
    setError("");
    setLoading(true);

    scannerRef.current
      ?.start()
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Rescan failed:", err);
        setError("Unable to restart camera.");
        setLoading(false);
      });
  };

  const handleStop = () => {
    scannerRef.current?.stop();
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      setResult(result.data);
    } catch (err) {
      console.error("Image scan failed:", err);
      setError("Failed to scan QR code from image.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-400 text-white min-h-screen flex flex-col items-center gap-6 justify-center p-4">
      <div className="p-6 max-w-md mx-auto text-center bg-white text-gray-800 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>

        {loading && <p className="text-gray-500">Initializing camera...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!result && !error && (
          <video
            ref={videoRef}
            className="w-full border rounded"
            style={{ maxHeight: 300 }}
            muted
            playsInline
          />
        )}

        {result && (
          <div className="mt-4 text-green-700">
            <p>
              <strong>Scanned Result:</strong> {result}
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 items-center">
          {!loading && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleRescan}
            >
              Scan Again
            </button>
          )}
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleStop}
          >
            Stop Camera
          </button>
          <input
            type="file"
            accept="image/*"
            className="mt-2 text-sm"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default QRReader;
