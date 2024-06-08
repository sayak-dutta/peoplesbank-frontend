import React from 'react'

function Layout({children}) {
  return (
    <div className='min-vh-100 bg-light' >
        {children}
    </div>
  )
}

export default Layout