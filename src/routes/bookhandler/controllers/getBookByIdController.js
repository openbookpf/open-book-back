const { book } = require("../../../db");

const getBookByIdController = async (id) => {
    const books = await book.findOne(id);
    return books;
}

module.exports = getBookByIdController;