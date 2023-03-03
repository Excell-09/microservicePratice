const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/commmets', (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/commmets', async(req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id, content,status:'pending' });

  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events',{
    type:"CommentCreated",
    data:{
      id,
      content,
      postId,
      status:'pending'
    }
  })

  res.status(201).json(comments);
});

app.post('/events',async(req,res)=>{
  const {type,data} = req.body
  console.log(type)

  if(type === "CommentModerated"){
    const {id,postId,status,content} = data
    
    const comments = commentsByPostId[postId]
    
    const comment = comments.find(comment => comment.id === id)
      
      comment.status = status
      
      await axios.post("http://localhost:4005/events",{
        type:"CommentUpdated",
        data:{
          id,
          status:comment.status,
          postId,
          content
        }
      })
      
    }
  res.send({})
})

app.listen(4001, () => {
  console.log('port listen on 4001');
});
