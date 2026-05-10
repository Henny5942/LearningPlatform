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
    <div>
        {categories.map((category) => (
            <SingleCategory key={category._id} category={category} />
        ))}
    </div>
  )
}

export default AllCategories