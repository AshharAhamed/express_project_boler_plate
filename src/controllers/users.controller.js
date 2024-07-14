
const usersService = require('../services/users.service');
/**
 * Get all Programming Language Controller
 */
async function getAllUsers(req, res, next) {
    try {
        res.json(await usersService.getAllUsers());
    } catch (err) {
        console.error(`Error while getting Users`, err.message);
        next(err);

    }
}


module.exports = {
    getAllUsers
};