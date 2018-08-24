const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Method', "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "success"
  });
});

app.get('/api/posts',(req, res, next) => {
  const posts = [
    {id:'hdshjjjb', title: 'hello', content: 'comming from the server'},
    {id:'hdsb', title: 'hello', content: 'maku'}
  ];
 res.status(200).json({
   message: 'sent success',
   posts: posts
 })
});

module.exports = app;
