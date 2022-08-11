const { render } = require('ejs');
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
require('dotenv').config();

// View engine setup
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'))

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('DB connected!'))
  .catch(err => console.error(err))
  
const trackingSchema = {
  customer: {Type: String},
  workId: {Type: String},
  date0: {Type: Date},
  date1: {Type: Date},
  date2: {Type: Date},
  date3: {Type: Date},
  date4: {Type: Date},
  date5: {Type: Date},
  phase: {Type: Number},
  photoLink: {Type: String},
  workName: {Type: String},
  trees: {Type: Number},
}

const tracking = mongoose.model('progressTracking', trackingSchema, 'progressTracking');

let id;
app.get('/tracking/:id', async function(req,res){
  id = req.params.id.toString();

  let process = await tracking.findById(id);

  res.render('tracker', { tracking: process })
})

app.get('/', (req, res) => {
  res.render('tracker');
})

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`)
})