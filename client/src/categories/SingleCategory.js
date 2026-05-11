import { Button } from '@mui/material'
import React, { useState } from 'react'
import AllSubCategories from '../subCategories/AllSubCategories'

const SingleCategory = ({ category }) => {
  const [showSubCategories, setShowSubCategories] =useState(false);
  const buttonClick=()=>{
    setShowSubCategories(!showSubCategories);
  }
  return (
    <div className='card'>
      <Button onClick={buttonClick}><h2>{category.name}</h2></Button>
      {showSubCategories && <AllSubCategories category={category}/>}
    </div>
  )
}

export default SingleCategory