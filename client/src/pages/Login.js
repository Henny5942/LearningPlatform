

    import React, { useContext } from 'react';
    import { TextField, Button, Box, Typography, Container } from '@mui/material';
    import { useState } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [values,setValues]=useState({
    username:"",
    password:"",
    })
    const { login } = useContext(AuthContext);

    const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        //התחברות
        const { data } = await axios.post("http://localhost:2500/api/users/login", values);
        console.log(data);
        if (data.token) {
        //שמירת הטוקן
        login(data.token);
        navigate("/categories"); //מעבר לדף של הקטגוריות
        }
    } catch (err) {
        const serverError = err.response?.data;

        // בדיקה ישירה של הודעת השגיאה מהשרת
        if (serverError === "The username does not exist") {
            alert("שם המשתמש אינו קיים");
        } else if (serverError === "The password is incorrect") {
            alert("הסיסמה שגויה");
        } else if (serverError === "username and password are required") {
            alert("נא להזין שם משתמש וסיסמה");
        } else {
            alert("שגיאה בהתחברות, נסה שוב מאוחר יותר");
        }

        console.error("Login Error:", serverError);
    }
    }

    return (
    //טופס לרישום למערכת
    <Container maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
            התחברות למערכת
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField 
            onChange={(e)=>{setValues({...values,username:e.target.value})}} value={values.username}  
            margin="normal" required fullWidth  label="שם משתמש"/>
            <TextField 
            onChange={(e)=>{setValues({...values,password:e.target.value})}} value={values.password}
            margin="normal" required fullWidth label="סיסמה" type="password"/>
            <Button 
            type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                התחברות
            </Button>
        </Box>
        </Box>
    </Container>
    );
}

export default Login