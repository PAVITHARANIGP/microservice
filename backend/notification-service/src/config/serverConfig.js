// serverConfig.js

// Server configurations
const serverConfig = {
    port: process.env.PORT || 3004, // Default port is 5000 if not provided in .env
    corsOptions: {
      origin: process.env.CORS_ORIGIN || '*', // Allow all origins by default
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  };
  
  module.exports = serverConfig;
  