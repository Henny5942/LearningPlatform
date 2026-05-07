const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0)
            return res.status(404).send("No categories found");
        res.json(categories);
    } catch (error) {
        res.status(500).send("Error fetching categories");
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category)
            return res.status(404).send("Category not found");
        return res.json(category);
    } catch (error) {
        res.status(500).send("Invalid ID format");
    }
};

const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name)
        return res.status(400).send("Name is required");

    try {
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).send("Error creating category");
    }
};

const updateCategory = async (req, res) => {
    const { id, name } = req.body;
    
    if (!id || !name)
        return res.status(400).send("id and name are required");

    try {
        const existingCategory = await Category.findById(id);
        if (!existingCategory)
            return res.status(404).send("Category not found");

        existingCategory.name = name;
        const updatedCategory = await existingCategory.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).send("Error updating category");
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryToDelete = await Category.findById(id); 

        if (!categoryToDelete)
            return res.status(404).send("Category not found");

        await categoryToDelete.deleteOne();
        res.send(`Category with id ${id} deleted successfully`);
    } catch (error) {
        res.status(500).send("Error deleting category");
    }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };