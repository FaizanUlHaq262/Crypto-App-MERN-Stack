require('dotenv').config();     //loads environment variables from a .env file into process.env
const express = require('express');
const connectDB = require('./config/db'); //imports the database connection from the config folder

const app = express();

connectDB();                    //connects to the database
app.use(express.json());        //allows us to parse JSON data

/* ALL ROUTES WRITTEN HERE */
app.get('/', (req, res) => res.send('API running'));        //creates a route that sends a response to the client

/*routes end */

const PORT = process.env.PORT || 5000;      //sets the port to the environment variable PORT or 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));      //starts the server on the specified port

const authRoutes = require('./routes/authRoutes');      //imports the authRoutes
app.use('/api/auth', authRoutes);            //creates a route for the authRoutes

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);
