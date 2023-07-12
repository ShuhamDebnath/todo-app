const mongoose = require("mongoose");

const Todo = mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true,
  },
  priority: {
    type: String,
  },
  color: {
    type: String,
  },
  date: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", Todo);
