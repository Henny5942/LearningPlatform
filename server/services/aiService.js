export const getAICompletion = async (category, subCategory, prompt) => {
  // במידה ואנחנו במצב פיתוח או ללא מפתח API, נחזיר Mock
  if (!process.env.OPENAI_API_KEY) {
    return `זהו שיעור מדומה בנושא ${category} - ${subCategory}. 
    ההנחיה שלך הייתה: "${prompt}". 
    בשלב הבא כאן תופיע תשובה אמיתית מה-AI.`;
  }

  // כאן תבוא הלוגיקה האמיתית של OpenAI (נדגים בהמשך)
};