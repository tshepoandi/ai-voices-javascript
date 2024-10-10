import express from 'express'
import cors from 'cors'
import voiceRoutes from '../routes/voiceRoute.js'
import geniusRoutes from '../routes/geniusRoute.js'
import scriptRoute from '../routes/geminiRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/voice', voiceRoutes)
app.use('/genius', geniusRoutes)
app.use('/gemini', scriptRoute)
app.get('/download', (req, res) => {
  const filePath = req.query.file
  const backendDir = path.join(__dirname, '../') // Move up one level to backend folder
  const fullPath = path.join(backendDir, filePath)

  console.log(`Checking for file: ${fullPath}`)

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File does not exist')
      return res.status(404).send('File not found')
    }

    res.download(fullPath, (err) => {
      if (err) {
        console.error('Error downloading file:', err)
        res.status(500).send('Could not download the file')
      }
    })
  })
})
app.listen(port, () => {
  console.log(`check this out at http://localhost:${port}`)
})
