import React, { useEffect, useState } from 'react'

import 'remixicon/fonts/remixicon.css'

import Admin from './components/Admin'
import Authentication from './components/Authentication'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(()=>{
 const isPassword =localStorage.getItem('adminpassword')

  if(isPassword){
    setIsAuthenticated(true)
  }
  else(
    setIsAuthenticated(false)
  )
 

  },[])
  return (
    <div className=''>
      {!isAuthenticated && <Authentication />}
      <div className={isAuthenticated ? '' : 'opacity-0'}>
        <Admin />
      </div>
    </div>
  )
}

export default App