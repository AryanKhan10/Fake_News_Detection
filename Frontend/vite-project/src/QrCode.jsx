import React from "react";
import QRCode from "react-qr-code";
import { useState } from "react";
function QrCode() {
  const [value, setValue] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [size, setSize] = useState(256);
  const [error, setError] = useState(false);

  const handleGeneterate = () => {
    if(!name || !email || !event) {
      setError("Please fill all fields");
      return;
    }
    setError(false);
    setValue(
      `${name}${email}${event}`
    );
  }


  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-400 text-white min-h-screen flex flex-col items-center gap-3 justify-center p-4">
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="text"
        onChange={(e) => setEvent(e.target.value)}
        placeholder="event"
      />
      {error &&<span>{error}</span>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        onClick={handleGeneterate}
      >Generate</button>
      <div className="">
      {value && (
                    <QRCode
                        title="GeeksForGeeks"
                        value={value}
                        bgColor="#ffffff"
                        size={size === '' ? 0 : size}
                    />
                )}
      </div>
    </div>
  );
}

export default QrCode;
