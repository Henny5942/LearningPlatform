import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Nav = () => {
  // משתנים מהקונטקסט
  const { token, logout, isAdmin } = useContext(AuthContext);
  const navigate= useNavigate();

  const buttonLogout=()=>{
    navigate('/');
    logout()
    
  }

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <NavLink to="/" >דף הבית</NavLink>
          <NavLink to="/categories" >לוח למידה</NavLink>
          <NavLink to="/history" >היסטוריה</NavLink>
          
          {/* מציג את לוח הבקרה רק אם המשתמש הוא אדמין */}
          {isAdmin && (
            <NavLink to="/admin">
              לוח בקרה
            </NavLink>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {token ? (
            // אם מחובר: מציג כפתור יציאה
            <Button 
              className='navB' 
              variant="contained" 
              onClick={buttonLogout} 
              style={{ color: 'white', fontSize: 15 }}>
              יציאה מהמערכת
            </Button>
          ) : (
            // אם לא מחובר: מציג כפתורי כניסה והרשמה
            <>
              <Button className='navB' variant="contained">
                <NavLink to="/login" style={{ color: 'white', fontSize: 15, textDecoration: 'none' }}>
                  כניסה למערכת
                </NavLink>
              </Button>
              
              <Button className='navB' variant="contained">
                <NavLink to="/addUser" style={{ color: 'white', fontSize: 15, textDecoration: 'none' }}>
                  יצירת חשבון
                </NavLink>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;