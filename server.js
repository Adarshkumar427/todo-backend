require('dotenv').config()

const constants = require('./src/utils/constants')
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.all(['/', '/api'], (_, res) => res.json({ message: 'server running ⚡⚡⚡' }))
app.use('/api/users', require('./src/api/users/routes'))
app.use('/api/auth', require('./src/api/auth/routes'))
app.use('/api/todos', require('./src/api/todos/routes'))
app.use((_, res) => res.status(405).json({ message: 'route not implemented ❌' }))

app.listen(process.env.PORT, async () => {
	console.log('Server started ✅')
	const connection = await mongoose.connect(process.env.MONGODB, {
		dbName: process.env.DATABASE
	})
	constants.db = connection.connection.db
	console.log('Atlas connected ✅')
})
