const express = require('express');
const bodyparser = require('body-parser')
const Qrcode = require('qrcode')
const mongoose = require('mongoose')
const { Rout1 } = require('./schema.cjs')

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
    var routno = () => {
      Math.floor(Math.random() * 10)
    }

    var url = "https://smarttransitapi.onrender.com/deleteticket" + routno;
    Qrcode.toDataURL(url)
      .then((qrcodeurl) => {
        Rout1.create({ 'route': 1,
          "stop": req.body.stop,
          "ticketCount": req.body.ticketcount,
          "qrcodeurl": qrcodeurl
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

app.post('/deleteticket/:qrcodeurl', async function (req, res) {
  try {
    const { qrcodeurl } = req.params;
    const deletedData = await Rout1.findOneAndDelete({ qrcodeurl });
    if (deletedData) {
      res.status(200).json({ "status": "success", "message": "QR code deleted" })
    } else {
      res.status(404).json({ "status": "failure", "message": "QR code not found" })
    }
  } catch (error) {
    res.status(500).json({ "status": "failure", "message": "Internal server error" })
  }
})