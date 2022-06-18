const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const infoRoutes = require('./routes/info')
const usersRoutes = require('./routes/users')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/info', infoRoutes)
app.use('/users', usersRoutes)

//connect to mongodb
mongoose.connect(
	process.env.DB_CONNECTION,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log('connected successfully!')
)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
//start server
app.listen(process.env.PORT, () => console.log('Port started'))
