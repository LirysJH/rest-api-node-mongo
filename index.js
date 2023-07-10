require('dotenv').config();

const port = 3000;
const express = require('express');
const mongoose = require('mongoose');
const mongoDBUrl = ''; // removed for security purpose

mongoose.connect(mongoDBUrl);
const database = mongoose.connection;

database.on('connected', () => console.log('DB connected'));
database.once('error', (err) => console.log(err));

const app = express();
const routes = require('./routes/routes');

app.use(express.json()); // support json
app.use('/api', routes);

app.listen(port, () => console.log(`Server running at ${port}`));