import React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';


const Nav = () => {
  // יצירת משתנה שיקבע האם להציג את הטופס
  
  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
       
          <NavLink to="/" >דף הבית</NavLink>
        
        <NavLink to="/categories" >נושאים</NavLink>
       
          <NavLink to="/history" >היסטוריה</NavLink>
       
        </div>
        <div>
        <Button className='navB'variant="contained" >
          <NavLink to="/addUser" style={{ color: 'white' }}>התחברות</NavLink>
        </Button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;