const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/dbConfig');
const serverConfig = require('./src/config/serverConfig');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors(serverConfig.corsOptions));
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = serverConfig.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
