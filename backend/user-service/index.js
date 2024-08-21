const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/config/dbConfig');
const serverConfig = require('./src/config/serverConfig');
// y1234rtyuiknbvcswertyuikmnbvcser567890plkjnbv
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors(serverConfig.corsOptions)); // Apply CORS options
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = serverConfig.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
