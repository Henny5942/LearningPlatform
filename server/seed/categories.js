require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

/**
 * פונקציה להזנת קטגוריות ראשוניות למסד הנתונים
 */
const seedCategories = async () => {
  const mongoUri = process.env.DATABASE_URI;

  if (!mongoUri) {
    console.error("שגיאה: משתנה הסביבה DATABASE_URI חסר");
    process.exit(1);
  }

  try {
    // התחברות למסד הנתונים
    await mongoose.connect(mongoUri);

    const categories = [
      "איכות הסביבה",
      "רפואה וטכנולוגיה",
      "חלל ואסטרונומיה",
     "פיזיקה וכימיה",
      "מדעי החיים",
      "כדור הארץ"
    ];

    // מעבר על כל קטגוריה ועדכון/יצירה שלה (Upsert)
    for (const name of categories) {
      await Category.updateOne(
        { name },
        { $set: { name } },
        { upsert: true }
      );
    }

    console.log("✅ Categories seeded successfully");
  } catch (error) {
    console.error("❌ Category seed failed:", error);
  } finally {
    // ניתוק בטוח ממסד הנתונים
 
  }
};

// הרצת הפונקציה במידה ומריצים את הקובץ ישירות
seedCategories();

// ייצוא הפונקציה לשימוש במקומות אחרים (ייצוא ישיר לפונקציה)
module.exports = seedCategories;