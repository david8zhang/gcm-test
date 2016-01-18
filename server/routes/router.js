var express = require('express');
var router = express.Router();
var gcmController = require('../controllers/gcm-obj-controller.js');

//API Endpoints
router.route('/gcm/index')
	.get(gcmController.getObjs);

router.route('/gcm/upload')
	.post(gcmController.postObj);

module.exports = router;