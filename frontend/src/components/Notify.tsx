import { BellIcon } from "@chakra-ui/icons";
import { Badge, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllNotifications } from "../service/notificationsService";


// Define the shape of a notification
interface Notification {
  _id: number;  // Example field, adjust as per your API response
  message: string;
  read: boolean;
}

interface NotifyProps {
  token: string | null;
}

const Notify: React.FC<NotifyProps> = ({ token }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getAllNotifications(token)
        .then((data) => {
          setNotifications(data);
        })
        .catch((error) => {
          setError('Failed to load notifications');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="Notifications" icon={<BellIcon />} colorScheme="teal" position="relative">
        <Badge colorScheme="red" variant="solid" position="absolute" top="-1" right="-1" borderRadius="full" fontSize="0.8em">
          {notifications.length}
        </Badge>
      </MenuButton>
      <MenuList>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem key={notification._id}>
              {!notification.read && <span style={{ color: 'blue', marginRight: '8px' }}>•</span>}
              {notification.message}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No notifications</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default Notify;
