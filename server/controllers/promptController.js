const promptService = require('../services/promptService');

const getAllPrompts = async (req, res) => {
    try {
        const prompts = await promptService.getAll();
        if (!prompts || prompts.length === 0)
            return res.status(404).send("No prompts found");
        res.json(prompts);
    } catch (error) {
        res.status(500).send("Error fetching prompts");
    }
};

const getPromptsFromUser = async (req, res) => {
    try {
        const prompts = await promptService.getByUser(req.user._id);
        if (!prompts || prompts.length === 0)
            return res.send("No history found");
        res.json(prompts);
    } catch (error) {
        res.status(500).send("Error fetching prompts");
    }
};
const getPromptById = async (req, res) => {
    try {
        const { id } = req.params;
        const prompt = await promptService.getById(id);
        if (!prompt)
            return res.status(404).send("Prompt not found");
        return res.json(prompt);
    } catch (error) {
        res.status(500).send("Invalid ID format");
    }
};


const createPrompt = async (req, res) => {
    try {
        const { category_id, sub_category_id, prompt, response = "" } = req.body; 
        const user_id = req.user._id; 

        if (!category_id || !sub_category_id )
            return res.status(400).send("category_id, sub_category_id are required");

        const newPrompt = await promptService.create({ 
            user_id, category_id, sub_category_id, prompt, response 
        });
        if (!newPrompt) 
            return res.status(500).send("Failed to save the prompt to database");
        res.status(201).json(newPrompt);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


const deletePrompt = async (req, res) => {
    try {
        const { id } = req.params;
        const successToDelete = await promptService.remove(id);
        
        if (!successToDelete)
            return res.status(404).send("Prompt not found");
        
        res.send(`Prompt with id ${id} deleted successfully`);
    } catch (error) {
        res.status(500).send("Error deleting prompt");
    }
};

module.exports = { getAllPrompts,getPromptsFromUser, getPromptById, createPrompt, deletePrompt };