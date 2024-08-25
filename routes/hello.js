//import express module
const express = require("express");

const helloRoutes = express.Router();

helloRoutes.get('/hello', (req,res) => {
    res.send('hello world');
});

module.exports = helloRoutes;