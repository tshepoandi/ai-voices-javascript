import express from 'express'
import cors from 'cors'
import voiceRoutes from '../routes/voiceRoute.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(port, () => {
  console.log(`check this out at http://localhost:${port}`)
})
app.use('/api', voiceRoutes)
