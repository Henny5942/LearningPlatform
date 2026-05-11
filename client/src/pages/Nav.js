import React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';


const Nav = () => {
  // יצירת משתנה שיקבע האם להציג את הטופס
  
  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
        <Button className='navB' variant="contained" >
          <NavLink to="/" style={{ color: 
            'white' }}>דף הבית</NavLink>
        </Button>
        <Button className='navB'variant="contained">
        <NavLink to="/categories" style={{ color: 'white' }}>נושאים</NavLink>
        </Button>
        <Button className='navB'variant="contained">
          <NavLink to="/lessons" style={{ color: 'white' }}>שיעורים</NavLink>
        </Button>
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