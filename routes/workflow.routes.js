const express = require('express')
const router  = express.Router()
const {sendReminder} = require('../controllers/workflow.controller')

router.post('/subscription/reminder',sendReminder)

module.exports = router;