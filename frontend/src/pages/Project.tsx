import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Spacer,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  FormLabel,
  FormControl,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddIcon, BellIcon } from "@chakra-ui/icons"; // Notification icon
import TaskTable from '../components/TaskTable';

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
  });
  const goToHome = () => {
    // Navigate to the home page
    navigate("/home");
  };

  const logout = () => {
    // Perform any necessary logout actions here
    // For example, clearing authentication tokens
    console.log("Logging out...");

    // Redirect to login or another page after logout
    navigate("/login");
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskDetails({
      ...taskDetails,
      [name]: value,
    });
  };

  const handleTaskSubmit = () => {
    // Handle task submission logic
    console.log("Task submitted:", taskDetails);
    onClose(); // Close the modal after submission
  };

  return (
    <Box p={5}>
      {/* Heading and Navigation */}
      <HStack spacing={4} align="center">
        <Stack>
          <Heading as="h2" size="xl">
            Projects
          </Heading>
          <Heading as="cite" size="xs" color="gray.600">
            "Manage your projects efficiently"
          </Heading>
        </Stack>
        <Spacer />
        {/* Navigator Button for Home */}
        <Button variant="outline" colorScheme="teal" onClick={goToHome}>
          Task
        </Button>
        {/* Notification Menu */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Notifications"
            icon={<BellIcon />}
            colorScheme="teal"
            position="relative"
          >
            <Badge
              colorScheme="red"
              variant="solid"
              position="absolute"
              top="-1"
              right="-1"
              borderRadius="full"
              fontSize="0.8em"
            >
              5
            </Badge>
          </MenuButton>
          <MenuList>
            <MenuItem>Your project deadline is approaching.</MenuItem>
            <MenuItem>New updates on Project Y.</MenuItem>
            <MenuItem>Task assignments have changed.</MenuItem>
            {/* Add more notifications as needed */}
          </MenuList>
        </Menu>
        {/* Logout Button */}
        <Button colorScheme="teal" onClick={logout}>
          Logout
        </Button>
      </HStack>
      <TaskTable />

        {/* Floating Button */}
        <IconButton
        aria-label="Add Task"
        icon={<AddIcon />}
        colorScheme="teal"
        position="fixed"
        bottom="14"
        right="14"
        size="lg"
        onClick={onOpen}
        borderRadius="full"
      />

      {/* Task Requirement Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalBody>
            <FormControl id="title" mb={4}>
              <FormLabel>Task Title</FormLabel>
              <Input
                name="title"
                value={taskDetails.title}
                onChange={handleTaskChange}
                placeholder="Enter task title"
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Task Description</FormLabel>
              <Textarea
                name="description"
                value={taskDetails.description}
                onChange={handleTaskChange}
                placeholder="Enter task description"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleTaskSubmit}>
              Submit
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

export default ProjectPage;
