const Notification = require('../models/notificationModel');

const createNotification = async (userId, message) => {
  const newNotification = new Notification({
    userId,
    message
  });
  return await newNotification.save();
};

const getNotifications = async (userId) => {
  return await Notification.find({ userId });
};

const updateNotification = async (notificationId, read) => {
  return await Notification.findOneAndUpdate(
    { notificationId },
    { read },
    { new: true }
  );
};

const deleteNotification = async (notificationId) => {
  return await Notification.findOneAndDelete({ notificationId });
};

module.exports = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification
};
