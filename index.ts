import './models'
import express from 'express'
import cors from 'cors'
import { PORT } from './core/config'
import { connectDB } from './core/db'
import { authRouter } from './routes/auth'
import { postRouter } from './routes/post'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json'

const app = express()
connectDB()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(express.static(__dirname + '/public'))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/auth', authRouter)
app.use('/post', postRouter)

app.listen(PORT, () => console.log(`server is running on ${PORT}`))