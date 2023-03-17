require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/starter";

app.get('/', (req, res) => {
    res.send(`Hello World!`);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});