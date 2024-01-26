import React from 'react'
import './header.css'
import banner from '../../assets/img/slide-marca-ecoalf.jpg'

const Header = () => {
  return (
    <div className='header'>
      <img src={banner} alt="" width={"100%"} height={"100%"}/>
      {/* <button className='btn_header' onClick={()=>{window.location = "/"}}>Go Back</button> */}
    </div>
  )
}

export default Header