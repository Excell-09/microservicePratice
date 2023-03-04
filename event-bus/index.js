const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async(req, res) => {
  const event = req.body;

  try {
    await axios.post("http://localhost:4000/events", event)
    await axios.post("http://localhost:4001/events", event)
    await axios.post("http://localhost:4002/events", event)
    await axios.post("http://localhost:4003/events", event)
    
  } catch (error) {
    console.log(error)
  }
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
