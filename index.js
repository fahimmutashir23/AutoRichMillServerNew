const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;


const userHandler  = require('./RouteHandler/UserHandler/userHandler');
require ("dotenv").config()

app.use(express.json())
app.use(cors())


mongoose.connect(process.env.CONNECTION_URI)
.then(() => console.log("Database Connect Successfully") )
.catch(err => console.log(err))


app.use('/api', userHandler)



  
  app.listen(port, () => {
    console.log(`Mill is running on port ${port}`);
  });
  