const programmingLanguagesService = require('../services/programmingLanguages.service');
const { errorResponseMessage } = require('../lib/response.messages');

/**
 * Insert Hard coded Programming Language Controller
 */
async function insert(req, res, next) {
    try {
        const response = await programmingLanguagesService.insert();
        res.json({ "message": "samplesuccessfully added" });
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
        /* let response = errorResponseMessage(err.message);
        res.status(500).json(response); */
    }
}

/**
 * Get all Programming Language Controller
 */
async function getAll(req, res, next) {
    try {
        res.json(await programmingLanguagesService.getAll());
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
        /* let response = errorResponseMessage(err.message);
        res.status(500).json(response); */
    }
}

/**
 * Get Programming Language by its name Controller
 */
async function getByName(req, res, next) {
    try {
        res.json(await programmingLanguagesService.getByName(req.params.name));
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
        /* let response = errorResponseMessage(err.message);
        res.status(500).json(response); */
    }
}

/**
 * Get all Programming Language Controller
 */
async function get(req, res, next) {
    try {
        res.json(await programmingLanguagesService.getAll());
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
        /* let response = errorResponseMessage(err.message);
        res.status(500).json(response); */
    }
}

/**
 * POST add a Programming Language Controller
 */
async function create(req, res, next) {
    try {
        await programmingLanguagesService.create(req.body);
        res.json({ "message": req.body.name + " successfully added" });
    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
        /* let response = errorResponseMessage(err.message);
        res.status(500).json(response); */
    }
}

/**
 * PUT modify a Programming Language Controller
 */
async function update(req, res, next) {
    try {
        res.json(await programmingLanguagesService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating programming language`, err.message);
        next(err);
        /* let response = errorResponseMessage(err.message);
        res.status(500).json(response); */
    }
}

/**
 * DELETE remove a Programming Language Controller
 */
async function remove(req, res, next) {
    try {
        res.json(await programmingLanguagesService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting programming language`, err.message);
        next(err);
        /* let response = errorResponseMessage(err.message);
        res.status(500).json(response); */
    }
}

module.exports = {
    get,
    getAll,
    create,
    update,
    remove,
    insert,
    getByName
};