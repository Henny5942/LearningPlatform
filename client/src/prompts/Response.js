import React from 'react'
import { useParams } from 'react-router-dom';

const Response = () => {
  const { id } = useParams();
  return (
    <div>Response: {id}</div>
  )
}

export default Response