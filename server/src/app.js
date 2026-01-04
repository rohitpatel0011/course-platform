const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/course', require('./routes/courseRoutes'));
app.use('/api/enrollment', require('./routes/enrollmentRoutes'));

app.get('/', (req, res) => {
  res.send('API is running live! ');
});

module.exports = app;