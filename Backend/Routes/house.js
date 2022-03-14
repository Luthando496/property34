const express = require('express')
const path = require('path')
const multer= require('multer')
const router = express.Router()
const house = require('../Controllers/House')

router.route('/').post(house.createHouse).get(house.getHouse)
router.route('/:id').get(house.fetchOne)
router.route('/prop/exclusive').get(house.exclusive)

// router.route('/upload-image').post(formidable(),house.newImage)
// router.route('/upload-image').post(upload.single('image'),house.newImage)

module.exports = router