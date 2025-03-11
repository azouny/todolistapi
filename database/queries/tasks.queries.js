const getAllTasks = 
`
SELECT * FROM tasks
WHERE user_id = $1
`;

const getTaskById = 
`
SELECT * FROM tasks
WHERE id = $1 and user_id = $2
`;

const addTask = 
`
INSERT INTO tasks (name, description, user_id) 
VALUES ($1, $2, $3)
RETURNING *
`;

const updateTask = 
`
UPDATE tasks
SET name = $1, description = $2
WHERE id = $3 and user_id = $4
RETURNING *
`;

const deleteTask = 
`
DELETE FROM tasks
WHERE id = $1 and user_id = $2
RETURNING *
`;

module.exports = 
{
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask
};