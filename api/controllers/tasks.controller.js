const pool = require('../../database/db');

const tasksQueries = require('../../database/queries/tasks.queries');

function getAllTasks(req, res, next)
{
    const user_id = req.userData.id;

    pool.query(tasksQueries.getAllTasks, [user_id] ,(error, result) => {
        
        if(error)
        {
            return res.status(500).json({
                error: error || 'error in database'
            });
        }

        res.status(200).json(result.rows);
    });
}

function getTaskById(req, res, next)
{
    const user_id = req.userData.id;
    const taskId = parseInt(req.params.taskId, 10);

    pool.query(tasksQueries.getTaskById, [taskId, user_id], (error, result) =>
    {
        if(error)
        {
            return res.status(500).json({
                error: error
            });
        }

        res.status(200).json(result.rows);
    });
}

function addTask(req, res, next)
{
    const user_id = req.userData.id;
    const {name, description} = req.body;


    pool.query(tasksQueries.addTask, [name, description, user_id], (error, result) => {

        if(error)
        {
            return res.status(500).json({
                error: error
            });
        }

        res.status(200).json(result.rows);
    });
}

function updateTask(req, res, next)
{
    const user_id = req.userData.id;
    const taskId = parseInt(req.params.taskId);
    const {name, description} = req.body;

    pool.query(tasksQueries.updateTask, [name, description, taskId, user_id], (error, result) => {

        if(error)
        {
            return res.status(404).json({
                error: error
            });
        }

        res.status(200).json(result.rows);
    });
}

function deleteTask(req, res, next)
{
    const user_id = req.userData.id;
    const taskId = parseInt(req.params.taskId);

    pool.query(tasksQueries.deleteTask, [taskId, user_id], (error, results) => {

        if(error)
        {
            return res.status(500).json({
                error: error
            });
        }

        res.status(200).json(results.rows);
    });
}

module.exports = 
{
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask
};