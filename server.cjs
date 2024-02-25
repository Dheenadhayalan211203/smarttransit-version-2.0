const express = require('express');
const bodyparser = require('body-parser')
const Qrcode = require('qrcode')
const mongoose = require('mongoose')
const { Rout1, Rout2 } = require('./schema.cjs')

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyparser.json())

async function connectToDb() {
  try {
    await mongoose.connect('mongodb+srv://Dheena:dheena123@cluster0.ser6ewc.mongodb.net/Smart_Transit?retryWrites=true&w=majority')

    app.listen(port, function () {
      console.log(`server is running on ${port}`)
    })
  } catch (error) {
    console.log(error)
    console.log('Error in connecting to the database')
  }
}

connectToDb();

app.post('/addcount-rout1', async function (req, res) {
  try {
    var routno =  Math.floor(Math.random() * 10)
   

    var url = "https://smarttransitapi.onrender.com/deleteticket" + routno;
    Qrcode.toDataURL(url)
      .then((qrcodeurl) => {
        Rout1.create({ 'route': 1,
          "stop": req.body.stop,
          "ticketCount": req.body.ticketcount,
          "qrcodeurl": qrcodeurl,
          "idno":routno
        })
          .then((data) => {
            res.status(201).json({ "status": "success", "message": "Count added", "qrcodeurl": qrcodeurl })
          })
          .catch((error) => {
            res.status(500).json({ "status": "failure", "message": "Internal server error" })
          })
      })
      .catch((error) => {
        res.status(500).json({ "status": "failure", "message": "Internal server error" })
      })
  } catch (error) {
    res.status(500).json({ "status": "failure", "message": "Internal server error" })
  }
})

app.post('/addcount-rout2', async function (req, res) {
  try {
    var routno =  Math.floor(Math.random() * 10)
   

    var url = "https://smarttransitapi.onrender.com/deleteticket" + routno;
    Qrcode.toDataURL(url)
      .then((qrcodeurl) => {
        Rout2.create({ 'route': 2,
          "stop": req.body.stop,
          "ticketCount": req.body.ticketcount,
          "qrcodeurl": qrcodeurl,
          "idno":routno
        })
          .then((data) => {
            res.status(201).json({ "status": "success", "message": "Count added", "qrcodeurl": qrcodeurl })
          })
          .catch((error) => {
            res.status(500).json({ "status": "failure", "message": "Internal server error" })
          })
      })
      .catch((error) => {
        res.status(500).json({ "status": "failure", "message": "Internal server error" })
      })
  } catch (error) {
    res.status(500).json({ "status": "failure", "message": "Internal server error" })
  }
})



app.post('/deleteticket1',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":1})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket2',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":2})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})


app.post('/deleteticket3',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":3})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket4',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":4})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket5',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":5})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket6',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":6})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket7',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":7})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket8',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":8})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket9',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":9})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})

app.post('/deleteticket10',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":10})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})
app.get('/getcount-data',async function(req,res){
  try{
     await Rout1.find(function(err,docs){
      if(!err)
       return res.status(200).send(docs);
      else
         console.log("Error retriving data");
   });
  }
  catch(e)
  {
    console.log('Error');
  
  }
})