const express = require('express');
const router = express.Router();
const constants = require('../../lib/constants');
const programmingLanguagesController = require('../../controllers/programmingLanguages.controller');

/**
 * Get method to test call land to proggrmming language routing
 */
router.get('/hi', (req, res) => {
    res.status(constants.SUCCESS_STATUS_CODE).json({ "message": "Hello AL-ULAA Team You are in API Version 1 programming-languages " });
});

/* GET programming languages. */
router.get('/', programmingLanguagesController.getAll);

/* GET programming languages. */
router.get('/:name', programmingLanguagesController.getByName);

/* Insert Sample */
router.get('/insert', programmingLanguagesController.insert);

/* POST programming language */
router.post('/', programmingLanguagesController.create);

/* PUT programming language */
router.put('/:id', programmingLanguagesController.update);

/* DELETE programming language */
router.delete('/:id', programmingLanguagesController.remove);

module.exports = router;
