var express = require('express');
var router = express.Router();
var gcmObjController = require('../controllers/gcm-obj-controller.js');
var gcmUserController = require('../controllers/gcm-user-controller.js');

//API Endpoints
router.route('/gcm/index')
	.get(gcmObjController.getObjs);

router.route('/gcm/upload')
	.post(gcmObjController.postObj);

router.route('/gcm/users')
	.get(gcmUserController.getUser);

router.route('/gcm/users/register')
	.post(gcmUserController.createUser);

module.exports = router;