import React from 'react'

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>
      find countries <input 
        onChange={handleFilterChange} 
        value={filter}/>
    </div>
  )
}

export default Filter