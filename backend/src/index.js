import express from 'express'
const app = express()
port = 3000
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`listening at port:${port}`)
})
