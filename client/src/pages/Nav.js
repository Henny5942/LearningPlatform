import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddUser from '../users/AddUser';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  // יצירת משתנה שיקבע האם להציג את הטופס
  
  return (
    <div>
      <nav>
        <Button variant="contained" >
          <NavLink to="/addUser" style={{ color: 'white' }}>התחברות</NavLink>
        </Button>
        <Button variant="contained">
        <NavLink to="/categories" style={{ color: 'white' }}>נושאים</NavLink>
        </Button>
        <Button variant="contained">
          <NavLink to="/lessons" style={{ color: 'white' }}>שיעורים</NavLink>
        </Button>
        <Button variant="contained" >
          <NavLink to="/" style={{ color: 'white' }}>דף הבית</NavLink>
        </Button>
      </nav>
    </div>
  );
};

export default Nav;