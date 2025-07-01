// server/server.js (Corrected)
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const wss = new WebSocket.Server({ port: 8080 });
const audioFilePath = path.join(__dirname, "Hidden.wav"); // <--- CHANGED HERE
let audioData;

try {
  audioData = fs.readFileSync(audioFilePath);
  console.log("Audio file (hidden_message.wav) loaded successfully."); // Updated log
} catch (err) {
  console.error(
    "CRITICAL ERROR: Could not find hidden_message.wav. Make sure it is in the server/ directory."
  );
  process.exit(1);
}

wss.on("connection", (ws) => {
  console.log("[+] Observer connected. Sending audio echo...");
  ws.send(audioData, { binary: true });
  ws.on("close", () => console.log("[-] Observer disconnected."));
});

console.log("Koan WebSocket server is running on port 8080.");
