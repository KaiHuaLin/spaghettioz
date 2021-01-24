const express = require('express');
// const mongoose = require('mongoose');


// App Config
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8001;
// const connection_url = '<url from mongodb>';


// Middlewares

// DB config
// mongoose.connect(connection_url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// }).then(() => console.log( 'Database Connected' ))
// .catch(err => console.log( err ));

// end point
app.get('/', (req, res) => res.status(200).send("HELLO WORLD"));


// listner
app.listen(port, () => console.log(`listening on localhost: ${port}`));