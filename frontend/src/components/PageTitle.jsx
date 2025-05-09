import React from 'react'

function PageTitle({title}) {
  return (
    <div className="text-xl" style={{fontSize: "20px", fontWeight: "bold"}}>
     {title}
    </div>
  )
}

export default PageTitle