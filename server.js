// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (request, response) => {
  response.send('I love CodersX');
});

var todos = ['Đi chợ', 'Nấu cơm', 'Rửa bát', 'Học tại CodersX'];

app.get('/todos', (req, res) => {
  res.render('todos/index', {
    todos: todos
  });
})

app.get('/todos/search', (req, res) => {
  var q = req.query.q;
  console.log(q)
  var todosFilter = todos.filter(item => {
    return item.toLowerCase().indexOf(q) !== -1;
  })
  res.render('todos/index', {todos: todosFilter, query: q});
})

app.get('/todos/create', (req, res) => {
  res.render('todos/create');
})

app.post('/todos/create', (req, res) => {
  todos.push(req.body.todo);
  res.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
