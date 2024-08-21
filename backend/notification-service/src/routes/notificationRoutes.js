const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/', notificationController.createNotification);
router.get('/getall', notificationController.getNotifications);
router.put('/put', notificationController.updateNotification);
router.delete('/delete', notificationController.deleteNotification);

module.exports = router;
