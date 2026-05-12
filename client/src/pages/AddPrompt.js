import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AddPrompt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    // כאן אנחנו מחלצים את ה-subCategory שהעברנו ב-navigate
    const subCategory = location.state?.subCategory;

    const [prompt, setPrompt] = useState("");

    // אם מישהו נכנס לדף ישירות בלי לעבור דרך הקטגוריות
    if (!subCategory) {
        return <div>שגיאה: לא נבחרו נתונים. חזור לדף הבית.</div>;
    }

    const addPrompt = async () => {
        if (!prompt.trim()) return alert("השאלה ריקה");
        
        try {
            const { data } = await axios.post("http://localhost:2500/api/prompts/", { 
                category_id: subCategory.category_id,
                sub_category_id: subCategory._id,
                prompt: prompt,
                response: ""
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate(`/response/${data._id}`);
        } catch (err) {
            console.error(err);
            alert("שגיאה בשליחה");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>יצירת שיעור חדש בנושא: {subCategory.name}</h2>
            <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="כתוב את השאלה שלך כאן..."
                style={{ width: '100%', height: '150px', borderRadius: '10px', padding: '15px' }}
            />
            <button onClick={addPrompt} style={{ marginTop: '20px' }}>שלח ל-AI</button>
        </div>
    );
};

export default AddPrompt;