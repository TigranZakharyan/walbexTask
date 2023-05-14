const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/post.ts', './routes/auth.ts']

const docs = { 
  host: 'localhost:8080'
}

swaggerAutogen(outputFile, endpointsFiles, docs).then(() => {require('./index')})