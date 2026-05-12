import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Nav = () => {
  const { token, logout } = useContext(AuthContext);
  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* כפתורי הניווט הראשיים */}
          <NavLink to="/" >דף הבית</NavLink>
          <NavLink to="/categories" >נושאים</NavLink>
          <NavLink to="/history" >היסטוריה</NavLink>
        </div>
        <div style={{display:'flex', gap:20}}>
          <Button className='navB'variant="contained">
            {token ? (
          <Button onClick={logout} style={{ color: 'white',fontSize:15 }}>יציאה מהמערכת</Button>
        ) : (
          <NavLink to="/login" style={{ color: 'white',fontSize:15  }}>כניסה למערכת</NavLink>
          )}
          </Button>
          {/* כפתור התחברות למערכת */}
        <Button className='navB'variant="contained" >
          <NavLink to="/addUser" style={{ color: 'white',fontSize:15  }}>יצירת חשבון</NavLink>
        </Button>


        </div>
      </nav>
    </div>
  );
};

export default Nav;