const express = require('express')
const app = express()
const port = 3000

// View engine setup
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('tracker')
})

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`)
})