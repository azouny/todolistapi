const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../../database/db');

const usersQueries = require('../../database/queries/users.queries');

function getAllUsers(req, res, next)
{
    // res.status(200).json({
    //     message: "getting all user"
    // });

    pool.query(usersQueries.getAllUsers, (error, result) => {

        if(error)
        {
            return res.status(500).json({
                error: error
            });
        }

        res.status(200).json(result.rows);
    });
}

function getUserById(req, res, next)
{
    // res.status(200).json({
    //     message: "getting one user"
    // });

    const userId = parseInt(req.params.userId);
    
    pool.query(usersQueries.getUserById, [userId], (error, result) => {

        if(error)
        {
            return res.status(500).json({
                error: error
            });
        }

        res.status(200).json(result.rows);
    });
}

function signUp(req, res, next)
{
    const {email, password} = req.body;

    bcrypt.hash(password, 10, (hashError, hash) => {

        if(hashError)
        {
            return res.status(500).json({
                error: hashError,
            });
        }

        pool.query(usersQueries.signUpUser, [email, hash], (error, results) => {
            if(error)
            {
                return res.status(500).json({
                    error: error
                });
            }

            res.status(200).json(results.rows);
        });
    });
}

function getUserByEmail(email)
{
    return new Promise((resolve, reject) => {
        pool.query(usersQueries.getUserByEmail, [email], (error, results) => {

            if(error)
            {
                reject(error);
            }
    
            resolve(results.rows[0]);
        });
    });
}

async function signIn(req, res, next)
{
    const {email, password} = req.body;

    const user = await getUserByEmail(email);


    if(!user)
    {
        return res.status(401).json({
            message: "Authyy failed"
        });
    }

    bcrypt.compare(password, user.password, (error, result) => {

        if(error)
        {
            return res.status(500).json({
                error: error
            });
        }

        if(result)
        {
            // TODO jwt Auth
            const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY, {expiresIn: "1h"});

            return res.status(200).json({
                message: "Auth succesful",
                token: token
            });
        }
        else
        {
            res.status(401).json({
                message: "Auth failed"
            });
        }
    });
}


function updateUser(req, res, next)
{
    res.status(200).json({
        message: "updating user"
    });
}

function deleteUser(req, res, next)
{
    const userId = parseInt(req.params.userId);

    pool.query(usersQueries.deleteUser, [userId], (error, results) => {

        if(error)
        {
            return res.status(500).json({
                error: error
            });
        }

        res.status(201).json(results.rows);
    });
}

module.exports = 
{
    getAllUsers,
    getUserById,
    signUp,
    signIn,
    updateUser,
    deleteUser
};