import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Spacer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Alert,
  AlertIcon,
  useToast,
  VStack,  // Import VStack for vertical alignment
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import axios from 'axios';
import TaskTable from '../components/TaskTable'; // Adjust the import path as needed
import Notify from '../components/Notify';
import { getAllNotifications } from '../service/notificationsService';

// Task type definition
export interface Task {
  taskId: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

// Define the state types for task details
interface TaskDetails {
  title: string;
  description: string;
  userId: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    title: '',
    description: '',
    userId: '' // Ideally, this should be set based on the authenticated user
  });
  const [taskIdToEdit, setTaskIdToEdit] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      getAllTasks(storedToken); // Fetch tasks only after token is set
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  // Service functions for API calls
  const addTask = async (taskDetails: TaskDetails) => {
    if (!token) return;
  
    try {
      const response = await axios.post('http://localhost:3002/api/tasks', taskDetails, {
        headers: {
          authorization: ` ${token}`, // Use  keyword for token
          'Content-Type': 'application/json'
        }
      });
      handleNotification('newBlog added')
      toast({
        title: 'Blog Added',
        description: 'Your Blog has been added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          message: error.message,
          response: error.response?.data,
          config: error.config,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      
      toast({
        title: 'Error',
        description: 'Failed to add blog.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      
      throw error;
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:3002/api/tasks/${taskId}`, {
        headers: {
          authorization: ` ${token}` // Use token
        }
      });
      handleNotification('blogDeleted')

      toast({
        title: 'blog Deleted',
        description: 'Your blog has been deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const editTask = async (taskId: string, updates: Partial<Task>) => {
    if (!token) return;
    try {
      await axios.put(`http://localhost:3002/api/tasks/${taskId}`, updates, {
        headers: {
          authorization: ` ${token}` // Use token
        }
      });
      toast({
        title: 'blog Updated',
        description: 'Your blog has been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error editing blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to update blog.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const getAllTasks = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:3002/api/tasks', {
        headers: {
          Accept: "*/*",
          'Content-Type': 'application/json',
          'authorization': ` ${token}`  // Use token
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog.');
      toast({
        title: 'Error',
        description: `Failed to load  blog. \n Error: ${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    try {
      if (token) {
        await addTask(taskDetails);
        setTaskDetails({ title: '', description: '', userId: '' });
        getAllTasks(token); // Refresh task list
        onClose(); // Close the modal after adding the task
      }
    } catch (error) {
      // Error handling is done in the addTask function
    }
  };

  const handleNotification = async (msg: string) => {
    try {
      if (token) {
        const newMsg = { message: msg };
        await axios.post('http://localhost:3004/api/notifications', newMsg, {
          headers: {
            Accept: "*/*",
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}` // Ensure correct format
          }
        });
        getAllNotifications(token)
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      if (token) {
        await deleteTask(taskId);
        getAllTasks(token); // Refresh task list
      }
    } catch (error) {
      // Error handling is done in the deleteTask function
    }
  };

  const handleToggleCompletion = async (taskId: string, completed: boolean) => {
    try {
      if (token) {
        await editTask(taskId, { completed }); // Update task with new completion state
        getAllTasks(token); // Refresh task list
      }
    } catch (error) {
      // Error handling is done in the editTask function
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // Clear the token from state
    navigate('/login');
  };

  return (
    <Box p={5} bg="brand.50" minHeight="100vh">
      <VStack spacing={4} align="stretch" mb={4}>
        <Stack align="center">
          <Heading as="h2" size="xl" textAlign="center">MyBlog</Heading>
          <Heading as="cite" size="xs" color="gray.600" textAlign="center">
            "Your personal productivity hub"
          </Heading>
        </Stack>
        <HStack spacing={4} justify="space-between" align="center">
          <Notify token={token} />
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </VStack>
      {
        loading ? (
          <div>Loading tasks...</div>
        ) : error ? (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <Box>
            <TaskTable
              tasks={tasks}
              token={token}
              onToggleCompletion={handleToggleCompletion} // Pass the new handler
              onDelete={handleDeleteTask}
            />
          </Box>
        )
      }

      <IconButton
        aria-label="Add Task"
        icon={<AddIcon />}
        colorScheme="red"
        position="fixed"
        bottom="14"
        right="14"
        size="lg"
        onClick={onOpen}
        borderRadius="full"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{taskIdToEdit ? 'Edit Blog' : 'Add New Blog'}</ModalHeader>
          <ModalBody>
            <FormControl id="title" mb={4}>
              <FormLabel>Task Title</FormLabel>
              <Input
                name="title"
                value={taskDetails.title}
                onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
                placeholder="Enter Blog title"
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Task Description</FormLabel>
              <Textarea
                name="description"
                value={taskDetails.description}
                onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
                placeholder="Enter Blog description"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddTask}>
              {taskIdToEdit ? 'Update' : 'Submit'}
            </Button>
            <Button variant="outline" ml={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
