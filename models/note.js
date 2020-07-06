const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	title: { type: String, required: false },
	body: { type: String, required: false },
	creation_time: { type: Date, default: Date.now() },
	last_update: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Note', noteSchema);
