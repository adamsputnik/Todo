const mongoose = require(mongoose);

const listItemSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model('ListItem', listItemSchema);
