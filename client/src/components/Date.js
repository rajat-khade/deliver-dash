import React from 'react'

const Date = () => {

  const date = Date.prototype.getDate()

  return (
    <div>
      {date}
    </div>
  )
}

export default Date
