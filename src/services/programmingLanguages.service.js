
const ProgrammingLanguage = require('../models/programmingLanguage.model');
const { errorResponseMessage, successResponseMessage } = require('../lib/response.messages');

/**
 * Get all Programming Languages Service
 */
async function getAll() {
    return await ProgrammingLanguage.find({});
}

/**
 * Get Programming Language by its name Service
 */
async function getByName(nameObj) {
    return await ProgrammingLanguage.findOne({ name: `${nameObj}` }).exec();
}

/**
 * Insert Programming Language Service
 */
async function insert(req, res, next) {
    const progLang = new ProgrammingLanguage({
        name: 'PHP',
        year: '1994'
    });
    await progLang.save()
}

async function create(programmingLanguage) {
    const progLang = new ProgrammingLanguage(programmingLanguage);
    await progLang.save()
}
/*
async function update(id, programmingLanguage) {
    const result = await db.query(
        `UPDATE programming_languages 
    SET name=?, released_year=?, githut_rank=?, 
    pypl_rank=?, tiobe_rank=? 
    WHERE id=?`,
        [
            programmingLanguage.name, programmingLanguage.released_year,
            programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
            programmingLanguage.tiobe_rank, id
        ]
    );

    let message = 'Error in updating programming language';

    if (result.affectedRows) {
        message = 'Programming language updated successfully';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM programming_languages WHERE id=?`,
        [id]
    );

    let message = 'Error in deleting programming language';

    if (result.affectedRows) {
        message = 'Programming language deleted successfully';
    }

    return { message };
} */

module.exports = {
    /*
    update,
    remove, */
    insert,
    getAll,
    create,
    getByName
}
