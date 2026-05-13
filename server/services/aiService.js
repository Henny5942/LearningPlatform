const getAICompletion = async (category, sub_category, prompt) => {
    // if (!process.env.OPENAI_API_KEY) {
    return `זהו שיעור מדומה בנושא ${category.name} - ${sub_category.name}. 
    ההנחיה שלך הייתה: "${prompt}". 
    בשלב הבא כאן תופיע תשובה אמיתית מה-AI.`;
  // }
};

module.exports = { getAICompletion };


// const { OpenAI } = require('openai');

// if (!process.env.OPENAI_API_KEY) {
//   console.error('Missing OPENAI_API_KEY environment variable');
//   throw new Error('OpenAI API key is not configured');
// }

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// /**
//  * Generate a structured lesson from OpenAI based on category, subcategory, and user prompt.
//  */
// const generateLesson = async (category, subCategory, userPrompt) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: `You are an educational assistant. Create a structured Hebrew lesson based on category: ${category} and sub-category: ${subCategory}.`
//         },
//         {
//           role: 'user',
//           content: userPrompt
//         }
//       ],
//       temperature: 0.7,
//     });

//     return response.choices?.[0]?.message?.content || null;
//   } catch (error) {
//     const openaiError = error.response?.data?.error?.message || error.response?.data || error.message;
//     console.error('Detailed OpenAI Error:', openaiError);
//     throw new Error(`Failed to generate AI lesson: ${openaiError}`);
//   }
// };

// module.exports = {
//   generateLesson,
// };