import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';

const SingleSubCategy = ({ subCategory }) => {
  const navigate = useNavigate();

  const goToPromptPage = () => {
    // אנחנו עוברים לדף חדש ומעבירים את האובייקט בתוך ה-state
    navigate('/create-prompt', { state: { subCategory } });
  };

  return (
    <Chip 
      label={subCategory.name} 
      onClick={goToPromptPage}
      sx={{ 
        backgroundColor: '#f0f4ff', 
        color: '#0066FF',
        borderRadius: '10px',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#e0e9ff' }
      }} 
    />
  );
};

export default SingleSubCategy;