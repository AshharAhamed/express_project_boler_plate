const mongoose = require('mongoose');

/**
 * Programming Language Model schema implementation
 */
const programmingLanguageSchema = new mongoose.Schema({
    name: String,
    year: Number
});

module.exports = programmingLanguageSchema;