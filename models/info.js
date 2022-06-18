const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	short_description: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	mainImage: {
		type: String,
		required: true,
	},
	muscleGroup: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Post', PostSchema, 'Posts')
