const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.post("/synchrous", async (req, res) => {
    try {
        const text = req.body.text;
        const apiKey = "AIzaSyAe4HyzBOGKsfjLwxtHHfPbUlBCwmwflBw"; 
        const key = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
        const audio = await synthesizeText(text, key); 
        res.json({ audio });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function synthesizeText(text, key) { 
    try {
        const response = await axios.post(key, {
            input: { text },
            voice: { languageCode: "en-US", name: "en-US-Standard-D" },
            audioConfig: { audioEncoding: "MP3" }
        });
        return `data:audio/mp3;base64,${response.data.audioContent}`;
    } catch (error) {
        console.error("Error synthesizing text:", error);
        return null;
    }
}

const port = 9900;
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});






