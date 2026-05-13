require('dotenv').config();
const mongoose = require('mongoose');
const Categories = require('../models/Category');
const Sub_Category = require('../models/SubCategory');

/**
 * פונקציה להזנת תתי-קטגוריות למסד הנתונים
 */
const seedSubCategories = async () => {
  const mongoUri = process.env.DATABASE_URI;

  if (!mongoUri) {
    console.error("Error: DATABASE_URI is required");
    process.exit(1);
  }

  try {
    // התחברות למסד הנתונים
    await mongoose.connect(mongoUri);

    const data = {
      Environment: ["Ecosystems","Resources","Sustainability"],
      MedTech: ["Body Systems", "Med-Innovation", "Wellness"],
      Space: ["Solar System", "Celestial Bodies", "SpaceTech"],
      Physics: ["Organic", "Inorganic", "Analytical"],
      Biology: ["Fauna", "Flora", "Anatomy"],
    };

    for (const categoryName in data) {
      // מציאת הקטגוריה המתאימה לפי השם
      const category = await Categories.findOne({ name: categoryName });

      if (!category) {
        console.log(`⚠️ Category not found: ${categoryName}`);
        continue;
      }

      // מעבר על רשימת תתי-הקטגוריות
      for (const subName of data[categoryName]) {
        await Sub_Category.updateOne(
          { name: subName, category_id: category._id },
          { $set: { name: subName, category: category._id } },
          { upsert: true }
        );
      }
    }

    console.log("✅ SubCategories seeded successfully");

  } catch (error) {
    console.error("❌ SubCategory seed failed:", error);
  } finally {
    // סגירת החיבור בסיום
  }
};

// הרצת הפונקציה
seedSubCategories();

// ייצוא הפונקציה
module.exports = { seedSubCategories };