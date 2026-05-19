import React, { useState, useContext } from 'react';
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AddPrompt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const subCategory = location.state?.subCategory;

    //אם אין את הנתונים
    if (!subCategory) {
        return <div>שגיאה: לא נבחרו נתונים. חזור לדף הבית.</div>;
    }

    const addPrompt = async () => {
        if (!prompt.trim()) return alert("הכנס שאלה");
        setIsLoading(true);
        //הוספת הפרומפט
        try {
            const { data } = await axios.post("http://localhost:2500/api/prompts/", {
                category_id: subCategory.category_id,
                sub_category_id: subCategory._id,
                prompt: prompt
            }, {
                headers: { Authorization: `Bearer ${token}` } //שליחת הטוקן
            });
            navigate(`/response/${data._id}`); //מעבר לדף של התשובה
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                alert("עליך להתחבר למערכת כדי לבצע פעולה זו");
            } else {
                const message = err.response?.data || err.message || "אירעה שגיאה בבקשה ל-AI";
                alert(message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        //הכנסת השאלה
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>יצירת שיעור חדש בנושא: {subCategory.name}</h2>
            <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="כתוב את השאלה שלך כאן..."
                style={{ width: '100%', height: '150px', borderRadius: '10px', padding: '15px' }}
                disabled={isLoading}
            />
            {/* כפתור לשליחת השאלה לקבלת שיעור */}
            <button onClick={addPrompt} style={{ marginTop: '20px' }} disabled={isLoading}>
                {isLoading ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <CircularProgress size={18} /> שולח...
                    </span>
                ) : 'שלח ל-AI'}
            </button>
        </div>
    );
};

export default AddPrompt;