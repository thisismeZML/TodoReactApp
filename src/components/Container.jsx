import React from 'react'

const Container = ({children}) => {
  return (
    <div className='grid grid-cols-4'>{children}</div>
  )
}

export default Container;