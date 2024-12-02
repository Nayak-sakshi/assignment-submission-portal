const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/assignment_portal', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Root route (for testing)
app.get('/', (req, res) => {
    res.send('Assignment Submission Portal API is up and running!');
});    


app.use('/user', userRoutes);
app.use('/admin', adminRoutes);



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
