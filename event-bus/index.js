const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

process.on("uncaughtException", (err) => {
    console.log(err);
});

const events = [];

app.post("/events", (req, res) => {
    console.log(req.body);
    const event = req.body;

    events.push(event);
    // Assumption: all of these are going to succeed
    // Post Service
    axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
        console.log(err.message);
    });
    // // Comments Service
    // axios.post("http://localhost:4001/events", event).catch((err) => {
    //     console.log(err.message);
    // });
    // // Query Service
    // axios.post("http://localhost:4002/events", event).catch((err) => {
    //     console.log(err.message);
    // });
    // // Moderation Service
    // axios.post("http://localhost:4003/events", event).catch((err) => {
    //     console.log(err.message);
    // });

    res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log("Event Bus listening on 4005");
});
