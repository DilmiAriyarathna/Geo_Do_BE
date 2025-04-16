const mongoose = require('mongoose');

const toDoItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false }
});

const taskSchema = new mongoose.Schema({
  locationID: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  locationName: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  taskDescription: { type: String },
  dueDate: { type: Date, required: true },
  toDos: [toDoItemSchema], // Array of checklist items
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
