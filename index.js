const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route.js'))

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.g1nhw.mongodb.net/todo?retryWrites=true&w=majority',
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