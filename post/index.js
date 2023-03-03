const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', async(req, res) => {
  const createRandom = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[createRandom] = {
    id: createRandom,
    title,
  };

  await axios.post('http://localhost:4005/events',{
    type:"PostCreated",
    data:{
      id:createRandom,title
    }
  })

  res.status(201).json(posts[createRandom]);
});

app.post('/events',(req,res)=>{
  console.log({type:req.body.type})

  res.send({})
})

app.listen(4000, () => {
  console.log(`server run on port 4000`);
});
