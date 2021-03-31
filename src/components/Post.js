import { Avatar } from '@material-ui/core'
import React from 'react'
import '../css/Post.css'
function Post({username,image_url,caption}) {
    return (
        <div className="post">
            <div className="header">
                <Avatar className="avatar"/>
                <span>{username}</span>
            </div>
            <img className="image" src={image_url} alt="new"/>
            <div className="caption">
                <strong>{username} : </strong>
                <span>{caption}</span>
            </div>
        </div>
    )
}

export default Post
