// test modal programming language 
const mongoose = require('mongoose');
const programmingLangualeSchema = require('./schemas/programmingLanguage.schema')

/**
 * creation of Programming Language Model using schema
 */
const ProgrammingLanguage = mongoose.model('ProgrammingLanguage', programmingLangualeSchema);

module.exports = ProgrammingLanguage;