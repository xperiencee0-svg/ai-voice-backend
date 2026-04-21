import express from "express";
import cors from "cors";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const app = express();
app.use(cors());
app.use(express.json());

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.post("/tts", async (req, res) => {
  const { text } = req.body;

  const audio = await client.textToSpeech.convert({
    text,
    voice_id: "Rachel"
  });

  res.setHeader("Content-Type", "audio/mpeg");
  res.send(audio);
});

app.listen(3000, () => console.log("Server running"));
