import React from 'react'
import SingleCategory from './SingleCategory'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AllCategories = () => {
    const [categories,setCategories]= useState([])
    try{
    const fetchCategories = async ()=>{
        const {data}= await axios.get("http://localhost:2500/api/categories/")
        if(data)
            setCategories(data.sort((a,b)=>a._id-b._id))
        }
    useEffect(()=>{
        fetchCategories()
    },[])
    }catch(err){
        console.error(err);
        alert("שגיאה בהתחברות לשרת");
    }
   
  return (
    /* הוספתי כאן עטיפה של Flexbox כדי שהכרטיסים יעמדו אחד ליד השני */
    <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        padding: '20px', 
        justifyContent: 'center',
        direction: 'rtl' 
    }}>
        {categories.map((category) => (
            /* עטיפה לכל כרטיס כדי שיהיה לו את המראה הלבן והנקי עם הצל */
            <div key={category._id} style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '24px',
                width: '280px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                textAlign: 'center',
                border: '1px solid #f0f0f0'
            }}>
                <SingleCategory category={category} />
            </div>
        ))}
    </div>
  )
}

export default AllCategories