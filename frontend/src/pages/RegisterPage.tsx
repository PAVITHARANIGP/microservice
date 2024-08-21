import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // State to hold form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
        description: "Please make sure your passwords match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        password,
      });

      if (response.status === 200) {
        navigate('/login');
        toast({
          title: "Registered.",
          description: "Welcome! Please log in to continue.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed.",
        description: "There was an error registering your account. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" centerContent height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box p={6} borderWidth={1} borderRadius="md" width="100%" maxWidth="md">
        <Heading mb={6} textAlign="center">Register</Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input 
              id="username" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input 
              id="password" 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={register}>
            Register
          </Button>
        </Stack>
        <Box mt={4} textAlign="center">
          <Link to="/login">Already have an account? Login here</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
