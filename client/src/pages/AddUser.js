import React, { useContext } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AddUser = () => {

  const navigate = useNavigate();
  const [values,setValues]=useState({
    username:"",
    password:"",
    phone:""
    })
  const { login } = useContext(AuthContext);

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      //הוספת משתמש
      const { data } = await axios.post("http://localhost:2500/api/users/register", values);
      console.log(data);
      if (data.token) {
        //שמירת הטוקן
        login(data.token);
        navigate("/categories"); //מעבר לדף של הקטגוריות
      }
    } catch (err) {
      console.error(err);
      alert("שם המשתמש כבר קיים");
    }
  }

  return (
    //טופס לרישום למערכת
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          הרשמה למערכת
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField 
          onChange={(e)=>{setValues({...values,username:e.target.value})}} value={values.username}  
           margin="normal" required fullWidth  label="שם משתמש"/>
          <TextField 
          onChange={(e)=>{setValues({...values,password:e.target.value})}} value={values.password}
          margin="normal" required fullWidth label="סיסמה" type="password"/>
          <TextField 
          onChange={(e)=>{setValues({...values,phone:e.target.value})}} value={values.phone}
          margin="normal" fullWidth label="פלאפון" type="number"/>
          <Button 
          type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
             הרשמה
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddUser;