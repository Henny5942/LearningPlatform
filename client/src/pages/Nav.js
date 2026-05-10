import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddUser from '../users/AddUser';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  // יצירת משתנה שיקבע האם להציג את הטופס
  
  return (
    <div>
      <nav>
        <NavLink to="/addUser">התחברות</NavLink>
        <NavLink to="/categories">נושאים</NavLink>
        <NavLink to="/lessons">שיעורים</NavLink>
        <NavLink to="/">דף הבית</NavLink>
      </nav>
    </div>
  );
};

export default Nav;