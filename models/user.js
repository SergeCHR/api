const mongoose = require('mongoose')

const exerciseData = {
	date: {
		type: Date,
		default: Date.now,
	},
	amountOfReps: Number,
}

const UserSchema = mongoose.Schema({
	firebaseId: {
		type: String,
		required: true,
	},
	workouts: [
		{
			title: {
				type: String,
				default: 'Hamstrings',
			},
			exercises: [
				{
					title: {
						type: String,
						default: 'Deadlifts',
					},
					activities: [exerciseData],
				},
			],
		},
	],
})

module.exports = mongoose.model('User', UserSchema, 'Users')
