express = require('express');
mongoose = require('mongoose');
bodyParser = require('body-parser');
router = express.Router();

const listItem = require('./models/listitem');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With-Header, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  next();
});

mongoose.connect('mongodb+srv://admin:admin@cluster0-bgy53.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Connection failed')
});

app.get("/api/todos", (req, res, next) => {
  // const todo = [
  //   {title: 'title one', content: 'content one'},
  //   {title: 'title two', content: 'content two'}
  // ];
  listItem.find().then(listitems => {
    res.status(200).json({
      message: 'posts fetched successfully',
      todo: listitems
    })
  });
});

app.post("/api/newitem", (req, res, next) => {
  const newitem = new listItem({
    title: req.body.title,
    content: req.body.content
  });
  newitem.save();
  console.log(newitem);
  res.status(201).json({
    message: 'post added successfully'
  });
});



module.exports = app;
