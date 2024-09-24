import express from 'express'
import cors from 'cors'
import voiceRoutes from '../routes/voiceRoute.js'
import geniusRoutes from '../routes/geniusRoute.js'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/voice', voiceRoutes)
app.use('/songs', geniusRoutes)
app.listen(port, () => {
  console.log(`check this out at http://localhost:${port}`)
})
