const cors = require('cors')
const express = require('express')


const app = express();

app.use(cors())
app.use(express.json());

const posts = {}

app.get('/posts', async(req, res) => {
  res.json(posts)
});

app.post('/events', async(req, res) => {
  const {type,data} = req.body

  if(type === "PostCreated"){
    const {id,title} = data
    posts[id] = {id, title,comments:[]}
  }

  if(type === "CommentCreated"){
    const {id,content,postId,status} = data

    const post = posts[postId]
    post.comments.push({
    id, content,status
    })
  }
  if(type === "CommentUpdated"){
    const {id,content,postId,status} = data

    const post = posts[postId]

    const comment = post.comments.find(comment => comment.id === id)
    comment.status = status
    comment.content = content
    
  }

  res.status({})
});

app.listen(4002,()=>{
  console.log('Server Listen on 4002')
})

