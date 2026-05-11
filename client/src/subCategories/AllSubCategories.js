import React, { useEffect, useState } from 'react'
import SingleSubCategy from './SingleSubCategy'
import axios from 'axios'
import { Box, Typography, Divider } from '@mui/material'

const AllSubCategories = ({ category }) => {
  const [subCategories, setSubCategories] = useState([])

  try {
    const fetchCategories = async () => {
      const { data } = await axios.get("http://localhost:2500/api/subCategories/")
      if (data)
        setSubCategories(data.filter(sub => sub.category_id === category._id))
    }
    useEffect(() => {
      fetchCategories()
    }, [])
  } catch (err) {
    console.error(err);
    alert("שגיאה בהתחברות לשרת");
  }

  return (
    <Box sx={{ mt: 2, textAlign: 'right' }}>
      {/* קו מפריד עדין וכותרת קטנה */}
      <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
      <Typography variant="caption" sx={{ color: '#6C757D', fontWeight: 'bold', mb: 1, display: 'block' }}>
        בחר תת קטגוריה ב{category.name}:
      </Typography>

      {/* קונטיינר לתתי הקטגוריות - מסודר בשורה שמתקפלת (Wrap) */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        justifyContent: 'flex-start' 
      }}>
        {subCategories.map(subCategory => (
          <SingleSubCategy key={subCategory._id} subCategory={subCategory} />
        ))}
      </Box>
    </Box>
  )
}

export default AllSubCategories