// .env files
require('dotenv').config();
// express import
const express = require('express')
// cors
const cors = require('cors')
// Config db
const { connectionDB } = require('./database/config')

// express server
const app = express()

// Set up cors
app.use(cors());

//BD
connectionDB();

// Parse and read body request
app.use(express.json())

//routes
app.use('/api/users', require('./routes/users'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/hospitals', require('./routes/hospitals'))
app.use('/api/doctors', require('./routes/doctors'))
app.use('/api/all', require('./routes/searches'))
app.use('/api/upload', require('./routes/uploads'))

// up server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`)
})