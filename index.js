const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:tesu123@cluster0.g1nhw.mongodb.net/todo?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (err) {console.log(err)}
}
start()