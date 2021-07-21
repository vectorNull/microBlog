const express = require("express");
// const bodyParser = require('body-parser') // As of Express 4.16.0+, body-parser is part of Express; no longer needed.
const { randomBytes } = require("crypto"); //Using this module to create a random ID for each post

const app = express();
app.use(express.json()) // use this instead of body-parser

// Using this empty object to store my posts
const posts = {};

// These are just your route handlers
app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", (req, res) => {
    // Let's generate a random id for each post that's 4 bytes long and in hexadecimal
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    // Snagging the id we just created and the title from the body and moving it into our posts object
    posts[id] = {
        id,
        title,
    };

    // Let the user know that we recevied the post along with the post[id]
    res.status(201).send(posts[id]);
});

// I'm having this service listen on port 4000
app.listen(4000, () => {
    console.log("Listening on 4000");
});
