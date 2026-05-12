import React from 'react';
import { Box, Card, Typography, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const HistoryItem = ({ item }) => {

    const navigate = useNavigate();

    //מעבר לדף של התשובה המלאה עם פרטי הפרומפט 
    const openResponse = () => {
    navigate(`/response/${item._id}`, { state: { prompt: item } });
  };
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)',border: '1px solid #f0f0f0',direction: 'rtl' // מבטיח יישור לימין של כל הכרטיס
    }}>
      {/* שורת הכותרת */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        
        {/* קטגוריה ותת קטגוריה */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>

          {/* קטגוריה */}
          <Chip label={item.category_id?.name || "קטגוריה"} size="small" 
            sx={{ backgroundColor: '#366aa1', color: '#ffffff', fontWeight: 'bold',borderRadius: '8px'
            }} 
          />

          {/* תת קטגוריה */}
          <Chip label={item.sub_category_id?.name || "תת קטגוריה"} size="small" 
            sx={{ backgroundColor: '#f0f4ff', color: '#0066FF', border: '1px solid #d0e0ff',fontWeight: '500',borderRadius: '8px'
            }} 
          />
        </Box>
        {/* תאריך */}
        <Typography variant="caption" color="textSecondary" sx={{ whiteSpace: 'nowrap', mr: 1 }}>
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString('he-IL') : ''}
        </Typography>
      </Box>

      {/* השאלה של המשתמש */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#1D2B3A', textAlign: 'right' }}>
        {item.prompt}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* השיעור */}
      <Box sx={{ backgroundColor: '#F8F9FA', p: 2, borderRadius: '12px', borderRight: '4px solid #0066FF' }}>
        <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#444', textAlign: 'right' }}>
          {item.response }
        </Typography>
      </Box>
      <Button variant="outlined"
        onClick={openResponse}
        sx={{ mt: 2, borderRadius: '10px' }}
      >
        קרא את התשובה המלאה
      </Button>
      
    </Card>
  );
};

export default HistoryItem;