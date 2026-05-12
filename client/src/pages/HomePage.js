import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>העתיד של הלמידה </h1>
      <h1>כבר כאן</h1>
      <button type="primary" size="large" style={{ marginTop: '20px' }}>
        <NavLink to="/categories" >התחילו ללמוד</NavLink>
      </button>
    </div>
  )
}

export default HomePage