const express = require('express')
const app = express()
const port = 3000
const static = express.static("public");

//Firebase credentials and connection
var admin = require("firebase-admin");
var serviceAccount = require("./urlshotener-b9a2a-firebase-adminsdk-lv8nt-fc507a0dcd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const urlsdb = admin.firestore().collection("urlsdb");
app.use(static);

//app.use((req,res,next) => {
  //  console.log('We interceted your request');
    //next();
//})

app.get("/:short",(req,res) => {
    console.log(req.params);
    const short = req.params.short

    const doc = urlsdb.doc(short);
    doc.get().then(response =>{
      const data = response.data();
      if(data && data.url){
        res.redirect(301,data.url);
      } else {
        res.redirect(301,"https://www.pipsnacks.com/404");
      }
    })
    //res.send('We will redirect you to ' +short);
})

app.post("/admin/urls/",(req,res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})