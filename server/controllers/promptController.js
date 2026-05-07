const Prompt = require('../models/Prompt');

const getAllPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find();
        if (!prompts || prompts.length === 0)
            return res.status(404).send("No prompts found");
        res.json(prompts);
    } catch (error) {
        res.status(500).send("Error fetching prompts");
    }
};

const getPromptById = async (req, res) => {
    try {
        const { id } = req.params;
        const prompt = await Prompt.findById(id);
        if (!prompt)
            return res.status(404).send("Prompt not found");
        return res.json(prompt);
    } catch (error) {
        res.status(500).send("Invalid ID format");
    }
};

const createPrompt = async (req, res) => {
    const { user_id, category_id, sub_category_id, prompt, response } = req.body;
    if (!user_id || !category_id || !sub_category_id)
        return res.status(400).send("user_id, category_id, and sub_category_id are required");
    
    try {
        const newPrompt = await Prompt.create({ user_id, category_id, sub_category_id, prompt, response });
        res.status(201).json(newPrompt);
    } catch (error) {
        res.status(400).send("Error creating prompt");
    }
};

const updatePrompt = async (req, res) => {
    // שימוש בשם משתנה שונה כדי למנוע התנגשות עם שם המודל/השדה
    const { id, user_id, category_id, sub_category_id, prompt: promptText, response } = req.body;
    
    if (!id || !user_id || !category_id || !sub_category_id)
        return res.status(400).send("id, user_id, category_id, and sub_category_id are required");

    try {
        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt)
            return res.status(404).send("Prompt not found");

        existingPrompt.user_id = user_id;
        existingPrompt.category_id = category_id;
        existingPrompt.sub_category_id = sub_category_id;
        existingPrompt.prompt = promptText; // כאן השתמשנו בשם המתוקן
        existingPrompt.response = response;

        const updatedPrompt = await existingPrompt.save();
        res.json(updatedPrompt);
    } catch (error) {
        res.status(500).send("Error updating prompt");
    }
};

const deletePrompt = async (req, res) => {
    try {
        const { id } = req.params;
        const promptToDelete = await Prompt.findById(id); // הוספת await
        
        if (!promptToDelete)
            return res.status(404).send("Prompt not found");

        await promptToDelete.deleteOne();
        res.send(`Prompt with id ${id} deleted successfully`);
    } catch (error) {
        res.status(500).send("Error deleting prompt");
    }
};

module.exports = { getAllPrompts, getPromptById, createPrompt, updatePrompt, deletePrompt };