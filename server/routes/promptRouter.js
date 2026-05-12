const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/', promptController.getAllPrompts);
router.get('/user', verifyJWT, promptController.getPromptsFromUser);
router.get('/:id', promptController.getPromptById);
router.post('/',verifyJWT, promptController.createPrompt);
router.put('/:id', promptController.updatePrompt);
router.delete('/:id', promptController.deletePrompt);

module.exports = router;