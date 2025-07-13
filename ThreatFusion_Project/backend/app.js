const express = require('express');
const cors = require('cors');
const cveRoutes = require('./routes/cveRoutes');
const feedRoutes = require('./routes/feedRoutes');
const ipRoutes = require('./routes/ipRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cve', cveRoutes);
app.use('/api/feed', authMiddleware, feedRoutes);
app.use('/api/ip', authMiddleware, ipRoutes);


const listEndpoints = require('express-list-endpoints');

// mount your routes...

console.log(listEndpoints(app));
module.exports = app;
