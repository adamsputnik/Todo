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

app.post("/api/newitem", (req, res, next) => {
  const newitem = new listItem({
    title: req.body.title,
    content: req.body.content
  });
  newitem.save().then(createditem => {
    res.status(201).json({
      message: 'post added successfully',
      newitem: {
        ...createditem,
        id: createditem._id
      }
    });
  });
});

app.put("/api/todos/:id", (req, res, next) => {
  const listitem = new listItem({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  listItem.updateOne({ _id: req.params.id }, listitem).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

app.get("/api/todos", (req, res, next) => {
  listItem.find().then(listitems => {
    res.status(200).json({
      message: 'posts fetched successfully',
      todo: listitems
    })
  });
});



app.get("/api/todos/:id", (req, res, next) => {
  listItem.findById(req.params.id).then(item => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

app.delete("/api/todos/:id", (req, res, next) => {
  listItem.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({
      message: 'Post deleted successfully'
    });
  });
});



module.exports = app;
