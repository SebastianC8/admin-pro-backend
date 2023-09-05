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

// port
const port = 3000

//BD
connectionDB();

//routes
app.get('/', (req, res) => res.status(202).json({ ok: true, message: "You're in home" }) );

// up server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`)
})