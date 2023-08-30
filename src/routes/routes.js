const express = require('express');
const router = express.Router();
const whatsappControllers = require('../controllers/whatsappControllers');

router.get('/', whatsappControllers.verifyToken);
router.post('/', whatsappControllers.receivedMessage);

module.exports = router;