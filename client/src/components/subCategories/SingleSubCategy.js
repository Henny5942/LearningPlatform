import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';

const SingleSubCategy = ({ subCategory }) => {
  const navigate = useNavigate();

  const toPromptPage = () => {
    // מעבר לדף של שליחת הפרומפט
    navigate('/create-prompt', { state: { subCategory } });
  };

  return (
    //הצגת תת קטגוריה בכפתור קטן
    <Chip 
      label={subCategory.name} 
      onClick={toPromptPage}
      sx={{ backgroundColor: '#f0f4ff', color: '#0066FF',borderRadius: '10px',cursor: 'pointer','&:hover': { backgroundColor: '#e0e9ff' }
      }} 
    />
  );
};

export default SingleSubCategy;