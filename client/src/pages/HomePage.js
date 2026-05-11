import React from 'react'
import Nav from './Nav'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>העתיד של הלמידה </h1>
      <h1>כבר כאן</h1>
      <button type="primary" size="large" style={{ marginTop: '20px' }}>
        <NavLink to="/categories" style={{ color: 'white' }}>התחילו ללמוד</NavLink>
      </button>
    </div>
  )
}

export default HomePage