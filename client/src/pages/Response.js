import React from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper, Chip, Divider, Container, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Response = () => {
  const navigate = useNavigate();
  const {id}= useParams();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPrompt = async () => {
      try{
        //שליפת הפרומפט המתאים
        const {data}=await axios.get(`http://localhost:2500/api/prompts/${id}`);
        setPrompt(data);
      } catch (error) {
        console.error("Error fetching prompt:", error);
      }finally { //כדי לשמור שיקרה בכל מקרה
        setLoading(false); 
      }
    }
      getPrompt();
    }, [id]);
    //אם זה עדיין במצב טעינה
    if (loading) {
    return (
      //שיציג הודעה שהוא טוען את השיעור עם אייקון
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress /> 
        <Typography sx={{ mr: 2 }}>טוען את השיעור...</Typography>
      </Box>
    );
}
  //אם לא נמצא פרומפט
  if (!prompt) {
    return (
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h5">אופס! השיעור לא נמצא</Typography>
        <Button onClick={() => navigate('/history')} sx={{ mt: 2 }}>חזרה להיסטוריה</Button>
      </Container>
    );
  }

  return (
    // מעבר להיסטוריה
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Button 
        startIcon={<ArrowForwardIcon />} 
        onClick={() => navigate('/history')} 
        sx={{ mb: 3, fontWeight: 'bold' }}
      >
      להיסטוריה
      </Button>

      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px' }}>
        
        {/* כותרות וקטגוריות */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={prompt.category_id?.name} color="primary" />
            <Chip label={prompt.sub_category_id?.name} variant="outlined" />
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1D2B3A', mb: 1 }}>
            {prompt.prompt}
          </Typography>
          
          <Typography variant="caption" color="textSecondary">
            נוצר בתאריך: {new Date(prompt.createdAt).toLocaleDateString('he-IL')}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* גוף התשובה - מעוצב כמו דף תוכן */}
        <Box sx={{ 
          backgroundColor: '#fcfcfc', 
          p: 3, 
          borderRadius: '16px',
          borderRight: '6px solid #0066FF' 
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#0066FF' }}>
            תשובת ה-AI:
          </Typography>
          
          <Typography variant="body1" sx={{ 
            lineHeight: 1.8, 
            color: '#2D3748', 
            fontSize: '1.1rem',
            whiteSpace: 'pre-line' // שומר על ירידות שורה מה-AI
          }}>
            {prompt.response}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Response;