const SubCategory = require('../models/SubCategory');

const getAll = async () => {
    return await SubCategory.find();
};

const getById = async (id) => {
    return await SubCategory.findById(id);
};

const create = async (name, category_id) => {
    return await SubCategory.create({ name, category_id });
};

const update = async (id, name, category_id) => {
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) return null;

    subCategory.name = name;
    subCategory.category_id = category_id;
    return await subCategory.save();
};

const remove = async (id) => {
    // השתמשתי ב-findByIdAndDelete כפי שהיה בקוד המקורי שלך
    return await SubCategory.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, remove };