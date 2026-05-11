import React, { useState } from 'react'
import AddPrompt from '../prompts/AddPrompt';

const SingleSubCategy = ({ subCategory }) => {
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  
  return (
    <div>
      <div onClick={() => setShowAddPrompt(true)}>
        {subCategory.name}
      </div>

      {showAddPrompt && <AddPrompt subCategory={subCategory} />}
    </div>
  )
}

export default SingleSubCategy