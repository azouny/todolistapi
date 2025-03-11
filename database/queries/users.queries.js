const getAllUsers = 
`
SELECT id, email FROM users
`;

const getUserById = 
`
SELECT id, email FROM users
WHERE id = $1
`;

const getUserByEmail = 
`
SELECT * from users
WHERE email = $1
`;

const signUpUser = 
`
INSERT INTO users (email, password)
VALUES ($1, $2)
RETURNING id, email
`;

const deleteUser = 
`
DELETE from users
WHERE id = $1
RETURNING id, email
`;

module.exports = 
{
    getAllUsers,
    getUserById,
    getUserByEmail,
    signUpUser,
    deleteUser
};