const SubCategory = require('../models/SubCategory');

const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.json(subCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSubCategory = async (req, res) => {
    try {
        const { name,category_id } = req.body;
        const subCategory = await SubCategory.create({ name, category_id });
        if(!subCategory) {
            return res.status(400).json({ message: 'Error creating subcategory' });
        }
        res.status(201).json(subCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const {id, name, category_id } = req.body;
        const subCategory = await SubCategory.findById(id);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        subCategory.name = name;
        subCategory.category_id = category_id;
        const updatedSubCategory = await subCategory.save();
        res.json(updatedSubCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory };  