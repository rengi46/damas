import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
      <button className='btn_header' onClick={()=>{window.location = "/"}}>Go Back</button>
      <h4>Games</h4>
    </div>
  )
}

export default Header