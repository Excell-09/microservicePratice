const express = require('express');
const axios = require('axios')

const app = express();

app.use(express.json());

const posts = {}

app.get('/posts', async(req, res) => {
  res.json(posts)
});

app.post('/events', async(req, res) => {
  const {type,data} = req.body
  console.log(type)
  if(type === "CommentCreated"){
    const status = data.content.includes("orange") ? "Reject" : "Approve"

    await axios.post('http://localhost:4005/events',{
      type:'CommentModerated',
      data:{
        id:data.id,
        postId:data.postId,
        status,
        content:data.content
      }
    })
  }
  res.send({})
});

app.listen(4003,()=>{
  console.log('Server Listen on 4003')
})

