const getAICompletion = async (category_id, sub_category_id, prompt) => {
    // if (!process.env.OPENAI_API_KEY) {
    return `זהו שיעור מדומה בנושא ${category_id} - ${sub_category_id}. 
    ההנחיה שלך הייתה: "${prompt}". 
    בשלב הבא כאן תופיע תשובה אמיתית מה-AI.`;
  // }
};

module.exports = { getAICompletion };