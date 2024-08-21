const jwt = require('jsonwebtoken');
const notificationService = require('../services/notificationService');
require('dotenv').config();
// Function to extract userId from token
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust JWT_SECRET to your secret key

    
    return decoded.id;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

exports.createNotification = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in "Bearer [token]" format

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const userId = getUserIdFromToken(token);
    const { message } = req.body;

    const newNotification = await notificationService.createNotification(userId, message);
    res.status(201).json(newNotification);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
    
  }
};

exports.getNotifications = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in "Bearer [token]" format

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const userId = getUserIdFromToken(token);

    const notifications = await notificationService.getNotifications(userId);
    
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in "Bearer [token]" format

  if (!token) return res.status(401).json({ error: 'No token provided' });

  const { notificationId } = req.params;
  const { read } = req.body;

  try {
    const userId = getUserIdFromToken(token);
    const updatedNotification = await notificationService.updateNotification(notificationId, read);
    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.json(updatedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in "Bearer [token]" format

  if (!token) return res.status(401).json({ error: 'No token provided' });

  const { notificationId } = req.params;

  try {
    const userId = getUserIdFromToken(token);
    const result = await notificationService.deleteNotification(notificationId);
    if (!result) return res.status(404).json({ message: 'Notification not found' });
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
