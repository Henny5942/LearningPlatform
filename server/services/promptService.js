const Prompt = require('../models/Prompt');

const getAll = async () => {
    return await Prompt.find();
};

const getByUser = async (userId) => {
    return await Prompt.find({ user_id: userId });
};

const getById = async (id) => {
    return await Prompt.findById(id);
};

const create = async (prompt) => {
    return await Prompt.create(prompt);
};


const remove = async (id) => {
    const prompt = await Prompt.findById(id);
    if (!prompt) return null;

    await prompt.deleteOne();
    return true;
};

module.exports = { getAll, getByUser, getById, create, remove };