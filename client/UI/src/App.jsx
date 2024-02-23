import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);

  const handleSynch = async () => {
    try {
      const res = await axios.post("http://localhost:9900/synchrous", { text });
      const audio = `data:audio/mp3;base64,${res.data.audioContent}`;
      setAudio(audio);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className='App'>
      <h1>Textni ovozga aylantirish</h1>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder='Enter'></textarea>
      <br />
      <button onClick={handleSynch}>Convert to Speech</button>
      <br />
      {audio && <audio controls src={audio}></audio>}
    </div>
  );
}

export default App;
