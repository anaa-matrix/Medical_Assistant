const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const PORT = process.env.PORT || 5000;  
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));


app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin 
  credentials: true, // Allow sending cookies and other credentials
}));
app.use(express.json());
app.use(cookieParser());
const loginroutes = require('./routes/loginroutes');
const signuproutes = require('./routes/signuproutes');
const ratingroutes = require('./routes/ratingroutes');
const reviewroutes = require('./routes/reviewroutes');
const recommendationroutes = require('./routes/recommendationroutes');
const doctorroutes = require('./routes/doctorroutes');

app.use('/api/v1/signup', signuproutes);
app.use('/api/v1/login', loginroutes);
app.use('/api/v1/rating', ratingroutes);
app.use('/api/v1/review', reviewroutes);
app.use('/api/v1/recommendation', recommendationroutes);
app.use('/api/v1/doctor', doctorroutes);


// Import the dbConnect function from the database.js file
const { dbConnect } = require('./config/database');
dbConnect();

app.get('/', (req, res) => {
  res.send('Hello World');
}   );  

app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);
});
