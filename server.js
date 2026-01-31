
import express from "express";
import bodyParser from "body-parser";
import request from "request";
import dotenv from "dotenv";
import { askAI } from "./ai.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
    const body = req.body;
    if (body.object === "page") {
        for (const entry of body.entry) {
            const event = entry.messaging[0];
            if (event.message && event.message.text) {
                const sender = event.sender.id;
                const reply = await askAI(event.message.text);
                sendMessage(sender, reply);
            }
        }
        res.status(200).send("EVENT_RECEIVED");
    } else res.sendStatus(404);
});

function sendMessage(sender, text) {
    request({
        uri: "https://graph.facebook.com/v19.0/me/messages",
        qs: { access_token: process.env.PAGE_TOKEN },
        method: "POST",
        json: { recipient: { id: sender }, message: { text } }
    });
}

app.listen(3000, () => console.log("AI Messenger Bot running!"));
