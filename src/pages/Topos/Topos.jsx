import React from 'react'
import Header from '../../components/header/Header'

export const Topos = () => {

  const style = {
    width: '100%',
    height: '100%',
    // position: 'absolute',
    // top: '0',
    // left: '0',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return (
    <div style={style}>
      <Header/>
      <iframe src="https://mellow-platypus-c20d1e.netlify.app" width="100%" height="60%"></iframe>
    </div>
  )
}
