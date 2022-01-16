const express = require('express')
const app = express()
const port = 3000
const static = express.static("public");

app.use(static);

//app.use((req,res,next) => {
  //  console.log('We interceted your request');
    //next();
//})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/another',(req,res) => {
    res.send('hello world from another');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})