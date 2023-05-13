import express from 'express'
import cors from 'cors'
import { PORT } from './core/config'
import { connectDB } from './core/db'
import { authRouter } from './routes/auth'
import bodyParser from 'body-parser'
import './models'
const app = express()
connectDB()

app.use(cors())
app.use(bodyParser.json())

app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`server is running on ${PORT}`))