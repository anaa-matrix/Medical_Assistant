const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');
const PORT = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin 
  credentials: true, // Allow sending cookies and other credentials
}));
// Import the dbConnect function from the database.js file
const { dbConnect } = require('./config/database');
dbConnect();

app.get('/', (req, res) => {
  res.send('Hello World');
}   );  

app.listen(PORT, () => {    
  console.log('Server is running on port 3000');
});

