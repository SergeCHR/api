const express = require('express')
const Info = require('../models/info')
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const foundArticles = await Info.find()
		res.json(foundArticles)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
router.get('/:slug/', async (req, res) => {
	try {
		const foundArticles = await Info.findOne({ slug: req.params.slug })
		res.json(foundArticles)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})
router.post('/', async (req, res) => {
	const article = new Info({
		title: req.body.title,
		short_description: req.body.short_description,
		description: req.body.description,
		mainImage: req.body.mainImage,
		muscleGroup: req.body.muscleGroup,
		slug: req.body.slug,
	})
	try {
		const newArcitle = await article.save()
		res.json(newArcitle)
	} catch (err) {
		res.status(400).send({ message: err.message })
	}
})

module.exports = router
