const express = require('express');
const parseToJson = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const catalog = 'http://localhost:3002'; 
const order = 'http://localhost:3003'; 
app.use(parseToJson.json());

// GET the book related to topic 
app.get('/search', async (req, res) => {
    const { topic } = req.query;
    console.log(topic)
    try {
        const response = await axios.get(`${catalog}/search?topic=${topic}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//Get the detailed of book [info]
app.get('/search/:BookID', async (req, res) => {
    //const { BookID } = req.params;
    let BookID=req.params.BookID
    console.log(BookID)
    try {
        const response = await axios.get(`${catalog}/search/${BookID}`);
       // const response = await axios.get(`${catalogServerUrl}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error Server' });
    }
});
// order order 
app.post('/order/:BookID', async (req, res) => {
    let BookID=req.params.BookID
    console.log(BookID)
    try {
        const response = await axios.post(`${order}/order/${BookID}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error Server ' });
    }
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server ready at: http://localhost: ${port}`);
});
