// .env files
require('dotenv').config();
// path
const path = require('path')
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

// Public folder
app.use(express.static('public'));

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

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

// up server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`)
})