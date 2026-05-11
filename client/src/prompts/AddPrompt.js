import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AddPrompt = ({subCategory}) => {

    const [prompt, setPrompt] = useState("");
    const { token } = useContext(AuthContext);
      const navigate = useNavigate();
    
    const addPrompt = async ()=>{
      if (!prompt.trim()) { 
        alert("לא ניתן להוסיף שאלה ריקה");
        return; 
    }
    try{
        const {data}= await axios.post("http://localhost:2500/api/prompts/",{ 
        category_id: subCategory.category_id,
        sub_category_id: subCategory._id,
        prompt: prompt,
        response: ""
      }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("השאלה נוספה בהצלחה!");
      setPrompt(""); 
      navigate("/response");
    } catch (err) {
      console.error("Error adding prompt:", err);
      alert("שגיאה בהתחברות לשרת או בשליחת הנתונים");
    }
}
  return (
    <div>
        <input 
          placeholder="הכנס את השאלה שלך כאן" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={addPrompt}>הוסף שאלה</button>
    </div>
  )
}

export default AddPrompt