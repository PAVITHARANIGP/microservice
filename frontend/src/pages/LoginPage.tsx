import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // State to hold form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      if (response.status === 200) {
        const { token } = response.data; 
        localStorage.setItem('token', token);
        navigate('/home');
        toast({
          title: "Logged in.",
          description: `Welcome back!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: "Invalid username or password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" centerContent height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box p={6} borderWidth={1} borderRadius="md" width="100%" maxWidth="md">
        <Heading mb={6} textAlign="center">Login</Heading>
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
          <Button colorScheme="teal" onClick={login}>
            Login
          </Button>
        </Stack>
        <Box mt={4} textAlign="center">
          <Link to="/register">Don't have an account? Register here</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
