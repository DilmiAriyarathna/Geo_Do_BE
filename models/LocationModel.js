const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
locationName: { type: String, required: true },
latitude: { type: Number, required: true },
longitude: { type: Number, required: true },
radius: { type: Number, required: true },
delay: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', LocationSchema);

