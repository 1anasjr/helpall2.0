import React from 'react'

const DashboardInfoModal = ({type,post}) => {
  return (
    <div>

        {type=="description" && <div>{post.recipientDescription}</div>}
        {type=="document" && 
        <div>
            <h3>Emirates Id: {post.emiratesId}</h3>
            <img src={post.document} alt="" />
        </div>}

    </div>
  )
}

export default DashboardInfoModal