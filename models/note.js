const mongoose = require('mongoose');
const dateTime = require('node-datetime');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	title: { type: String, required: false },
	body: { type: String, required: false },
	creation_time: { type: Date, default: dateTime.create().format('Y-m-d H:M:S') },
	last_update: { type: Date, default: dateTime.create().format('Y-m-d H:M:S') }
});

module.exports = mongoose.model('Note', noteSchema);
