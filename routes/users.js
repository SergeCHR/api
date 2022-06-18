const express = require('express')
const User = require('../models/user')
const router = express.Router()

//GET
//get all users
router.get('/', async (req, res) => {
	try {
		const foundUsers = await User.find()
		res.json(foundUsers)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//get particular user
router.get('/:userId', async (req, res) => {
	try {
		const foundUser = await User.findOne({ firebaseId: req.params.userId })
		res.json(foundUser)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
router.get('/:userId/:muscleGroup/:exercise/', async (req, res) => {
	try {
		const foundUser = await User.findOne({ firebaseId: req.params.userId })
		const exercise = foundUser.workouts
			.filter((el) => el.title === req.params.muscleGroup)[0]
			.exercises.filter((el) => el.title === req.params.exercise)[0]
		res.json(exercise)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})

//POST
//create user
router.post('/', async (req, res) => {
	const user = new User({ firebaseId: req.body.firebaseId })
	try {
		const newUser = await user.save()
		res.json(newUser)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//create new muscle group
router.post('/:userId/', async (req, res) => {
	try {
		User.findOneAndUpdate(
			{ firebaseId: req.params.userId },
			{ $push: { workouts: { title: req.body.muscleGroup, exercises: [] } } },
			function (error, success) {
				if (error) {
					console.log(error)
				} else {
					res.send(success)
				}
			}
		)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})

//create new exercise
router.post('/:userId/:muscleGroup', async (req, res) => {
	try {
		User.findOneAndUpdate(
			{ firebaseId: req.params.userId },
			{
				$push: {
					[`workouts.$[element].exercises`]: {
						title: req.body.exercise,
						activities: [],
					},
				},
			},
			{
				arrayFilters: [
					{
						'element.title': req.params.muscleGroup,
					},
				],
			},
			function (error, success) {
				if (error) {
					console.log(error)
				} else {
					res.send(success)
				}
			}
		)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//add element to exercise
router.post('/:userId/:muscleGroup/:exercise', async (req, res) => {
	try {
		User.findOneAndUpdate(
			{ firebaseId: req.params.userId },
			{
				$push: {
					[`workouts.$[element].exercises.$[second].activities`]: {
						// date: new Date('2021,10,10'),
						amountOfReps: req.body.amountOfReps,
					},
				},
			},
			{
				arrayFilters: [
					{
						'element.title': req.params.muscleGroup,
					},
					{
						'second.title': req.params.exercise,
					},
				],
			},
			function (error, success) {
				if (error) {
					console.log(error)
				} else {
					res.send(success)
				}
			}
		)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//PUT
//update muscle group name
router.put('/:userId/:muscleGroup/', async (req, res) => {
	try {
		User.findOneAndUpdate(
			{ firebaseId: req.params.userId },
			{
				$set: {
					[`workouts.$[element].title`]: req.body.muscleGroupUpdate,
				},
			},
			{
				arrayFilters: [
					{
						'element.title': req.params.muscleGroup,
					},
				],
			},
			function (error, success) {
				if (error) {
					console.log(error)
				} else {
					res.send(success)
				}
			}
		)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//update exercise name
router.put('/:userId/:muscleGroup/:exercise', async (req, res) => {
	try {
		User.findOneAndUpdate(
			{ firebaseId: req.params.userId },
			{
				$set: {
					[`workouts.$[element].exercises.$[second].title`]:
						req.body.exerciseUpdate,
				},
			},
			{
				arrayFilters: [
					{
						'element.title': req.params.muscleGroup,
					},
					{
						'second.title': req.params.exercise,
					},
				],
			},
			function (error, success) {
				if (error) {
					console.log(error)
				} else {
					res.send(success)
				}
			}
		)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//update exercise activity amount of reps
router.put('/:userId/:muscleGroup/:exercise/:activity', async (req, res) => {
	try {
		User.findOneAndUpdate(
			{ firebaseId: req.params.userId },
			{
				$set: {
					[`workouts.$[element].exercises.$[second].activity.$[third].amountOfReps`]:
						req.body.amountOfReps,
				},
			},
			{
				arrayFilters: [
					{
						'element.title': req.params.muscleGroup,
					},
					{
						'second.title': req.params.exercise,
					},
					{
						'third.date': req.body.date,
					},
				],
			},
			function (error, success) {
				if (error) {
					console.log(error)
				} else {
					res.send(success)
				}
			}
		)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//DELETE
//delete user
router.delete('/:userId', async (req, res) => {
	try {
		const removedUser = await User.deleteOne({ firebaseId: req.params.userId })
		res.json(removedUser)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})

//delete muscle group
router.delete('/:userId/:muscleGroup', async (req, res) => {
	try {
		const deletedGroup = await User.updateOne(
			{ firebaseId: req.params.userId },
			{
				$pull: {
					workouts: { title: req.params.muscleGroup },
				},
			}
		)
		res.json(deletedGroup)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//delete exercise
router.delete('/:userId/:muscleGroup/:exercise', async (req, res) => {
	try {
		const deletedExercise = await User.updateOne(
			{ firebaseId: req.params.userId },
			{
				$pull: {
					[`workouts.$[element].exercises`]: { title: req.params.exercise },
				},
			},
			{
				arrayFilters: [
					{
						'element.title': req.params.muscleGroup,
					},
				],
			}
		)
		res.json(deletedExercise)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
//delete exercise activity
router.delete('/:userId/:muscleGroup/:exercise/:activity', async (req, res) => {
	try {
		const deletedExercise = await User.updateOne(
			{ firebaseId: req.params.userId },
			{
				$pull: {
					[`workouts.$[element].exercises.$[second].activities`]: {
						date: req.body.date,
					},
				},
			},
			{
				arrayFilters: [
					{
						'element.title': req.params.muscleGroup,
					},
					{
						'second.title': req.params.exercise,
					},
				],
			}
		)
		res.json(deletedExercise)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
module.exports = router
