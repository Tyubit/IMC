const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 3000;

//connect mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err.message);
    });

app.get('/', (req, res) => res.send('Hello World!'));

app.use("/api/user", require('./routes/user.route'));
app.use("/api/auth", require('./routes/auth.route'));
app.use("/api/task", require('./routes/task.route'));

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
