// notificationsService.ts
import axios from 'axios';

export const getAllNotifications = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:3004/api/notifications/getall', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // Re-throw error to handle it in the component
  }
};
