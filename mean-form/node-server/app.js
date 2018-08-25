const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

const url = "mongodb+srv://popo:HzP2sfb3XYzIvR2N@mean-cluster-x54kt.mongodb.net/test?retryWrites=true";

mongoose.connect(url, { useNewUrlParser: true })
.then(() => {
  console.log("successfull connection");
})
.catch(() => {
  console.log("connection fail");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "success"
  });
});

app.get('/api/posts',(req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'sent success',
      posts: documents
    })
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({message:'post deleted'});
  });
})

module.exports = app;
