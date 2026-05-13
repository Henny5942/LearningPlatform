// ייבוא הספריות הנדרשות
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * פונקציה ליצירה או עדכון של משתמש מנהל (Admin)
 */
async function seedAdmins() {
  const mongoUri = process.env.DATABASE_URI;
  const adminName = process.env.ADMIN_NAME || "Admin";
  const adminPhone = process.env.ADMIN_PHONE || "0500000000";

  // בדיקה שהגדרת הקישור למסד הנתונים קיימת
  if (!mongoUri) {
    console.error("שגיאה: חסר משתנה סביבה DATABASE_URI");
    process.exit(1);
  }

  try {
    // התחברות למסד הנתונים
    await mongoose.connect(mongoUri);
    console.log("מחובר ל-MongoDB בהצלחה...");

    // חיפוש משתמש לפי טלפון ועדכון לסטטוס אדמין, או יצירה אם לא קיים (upsert)
    const admin = await User.findOneAndUpdate(
      { phone: adminPhone }, // תנאי החיפוש
      { 
        name: adminName, 
        phone: adminPhone, 
        isAdmin: true 
      }, // הנתונים לעדכון/הזנה
      { 
        new: true,   // החזרת המסמך המעודכן
        upsert: true // יצירת מסמך חדש אם לא נמצא
      }
    );

    console.log(`מנהל המערכת מוכן: ${admin.name} (${admin.phone})`);

  } catch (error) {
    console.error("נכשל בתהליך ה-Seed:", error);
  } finally {
    // ניתוק בטוח ממסד הנתונים בסיום
    await mongoose.disconnect();
    console.log("החיבור ל-MongoDB נסגר.");
  }
}

// הרצת הפונקציה
seedAdmins();