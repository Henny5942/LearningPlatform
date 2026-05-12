import { Button, Typography, Box } from '@mui/material'
import React, { useState } from 'react'
import AllSubCategories from '../subCategories/AllSubCategories'
import SchoolIcon from '@mui/icons-material/School'; // דוגמה לאייקון, אפשר להחליף

const SingleCategory = ({ category }) => {
  const [showSubCategories, setShowSubCategories] = useState(false);
  
  //שינוי הערך כדי להראות או להסתיר את תתי הקטגוריות
  const buttonClick = () => {
    setShowSubCategories(!showSubCategories);
  }

  return (
    <Box className='card' sx={{ textAlign: 'center' }}>
      {/* אייקון */}
      <Box sx={{ backgroundColor: '#f0f7ff', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto',color: '#0066FF'
      }}>
        <SchoolIcon fontSize="large" />
      </Box>

      {/* שם הקטגוריה */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1D2B3A', marginBottom: '8px' 
      }}>
        {category.name}
      </Typography>

      {/* הוראה לפתיחת תתי הקטגוריות */}
      <Typography variant="body2" sx={{ color: '#6C757D', marginBottom: '20px' }}>
        לחץ כדי לצפות בתתי הקטגוריות וללמוד נושאים חדשים
      </Typography>

      {/* כפתור לפתיחת תתי הקטגוריות */}
      <Button 
        variant={showSubCategories ? "outlined" : "contained"} 
        onClick={buttonClick}
        fullWidth
        sx={{ 
          borderRadius: '12px', 
          textTransform: 'none',
          backgroundColor: showSubCategories ? 'transparent' : '#1D2B3A',
          '&:hover': {
            backgroundColor: showSubCategories ? 'rgba(29, 43, 58, 0.04)' : '#2c3e50',
          }
        }}
      >
        {showSubCategories ? 'סגור' : 'צפה בתכנים'}
      </Button>

      {/* הצגת תתי קטגוריות מתחת */}
      {showSubCategories && (
        <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
          <AllSubCategories category={category}/>
        </Box>
      )}
    </Box>
  )
}

export default SingleCategory