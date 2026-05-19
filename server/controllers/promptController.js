const promptService = require('../services/promptService');
const aiService = require('../services/aiService');

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
            return res.status(404).send("No history found");
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
        const { category_id, sub_category_id, prompt } = req.body;
        const user_id = req.user._id;
        if (!req.user || !req.user._id)
            return res.status(401).send("Unauthorized");
        if (!category_id || !sub_category_id)
            return res.status(400).send("category_id and sub_category_id are required");
        if (!prompt || typeof prompt !== 'string' || !prompt.trim())
            return res.status(400).send("Prompt text is required");

        const aiResponse = await aiService.getAICompletion(category_id, sub_category_id, prompt);
        const newPrompt = await promptService.create({
            user_id, category_id, sub_category_id, prompt, response: aiResponse
        });
        if (!newPrompt)
            return res.status(500).send("Failed to save the prompt to database");

        res.status(201).json(newPrompt);
    } catch (error) {
        console.error('Prompt creation error:', error);
        const isAIError = error.message?.includes('Unable to connect to the AI service') || error.message?.includes('Failed to generate AI lesson');
        const status = isAIError ? 502 : 400;
        res.status(status).send(error.message);
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