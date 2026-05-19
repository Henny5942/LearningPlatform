const { OpenAI } = require('openai');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

if (!process.env.AI_KEY) {
  console.error('Missing AI_KEY environment variable');
  throw new Error('OpenAI API key is not configured');
}

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
});

const isConnectionError = (errorMessage) => {
  if (!errorMessage) return false;
  const lower = errorMessage.toLowerCase();
  return lower.includes('connect') || lower.includes('network') || lower.includes('timeout') || lower.includes('unable to reach') || lower.includes('request failed');
};

/**
 * Generate a structured lesson from OpenAI based on category, subcategory, and user prompt.
 */
const resolveName = async (entity, Model) => {
  if (!entity) return null;
  // If it's an object with a name, return it
  if (typeof entity === 'object') return entity.name || null;
  // If it's a string, try to resolve as an id in the DB, otherwise return the string
  if (typeof entity === 'string') {
    try {
      const doc = await Model.findById(entity);
      if (doc && doc.name) return doc.name;
    } catch (e) {
      // ignore and fallthrough to return raw string
    }
    return entity;
  }
  return String(entity);
};

const getAICompletion = async (category, sub_category, prompt) => {
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    throw new Error('Prompt text is required');
  }

  try {
    // Ensure AI receives human-readable names (resolve IDs or objects)
    const categoryName = await resolveName(category, Category);
    const subCategoryName = await resolveName(sub_category, SubCategory);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an educational assistant. Explain the subject clearly based on category: ${categoryName || category} and sub-category: ${subCategoryName || sub_category}. Provide informative, explanatory content and examples where useful, rather than study instructions. Use the same language as the user's prompt.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return response.choices?.[0]?.message?.content || null;
  } catch (error) {
    const openaiError = error?.response?.data?.error?.message || error?.response?.data || error?.message || 'Unknown AI error';
    console.error('Detailed OpenAI Error:', openaiError);

    if (isConnectionError(openaiError)) {
      throw new Error('Unable to connect to the AI service. Please check your network and API key.');
    }

    throw new Error(`Failed to generate AI lesson: ${openaiError}`);
  }
};

module.exports = { getAICompletion };