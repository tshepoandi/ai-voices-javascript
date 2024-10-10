import express from 'express'
import cors from 'cors'
import voiceRoutes from '../routes/voiceRoute.js'
import geniusRoutes from '../routes/geniusRoute.js'
import scriptRoute from '../routes/geminiRoute.js'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/voice', voiceRoutes)
app.use('/genius', geniusRoutes)
app.use('/gemini', scriptRoute)

app.get('/download', (req, res) => {
  const filePath = req.query.file
  const fullPath = path.join(__dirname, filePath)

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
