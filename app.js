const express = require('express');

const app = express();

const tasksRoute = require('./api/routes/tasks.router');

const usersRoute = require('./api/routes/users.router');

app.use(express.json());

app.use('/tasks', tasksRoute);

app.use('/users', usersRoute);

app.use('/', (req, res, next) =>{
    res.status(200).json({
        message: "welcome home"
    });
});



module.exports = app;