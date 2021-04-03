import { Avatar, Button } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import '../css/Post.css'
import { db }  from './Firebase'
function Post({user,postId,username,image_url,caption}) {
    const [comments,setComments] = useState([])
    const [comment,setComment] = useState('')
    
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db.collection('posts').doc(postId).collection('comments').onSnapshot(snapshot=>{
                setComments(snapshot.docs.map(doc=>{
                    // console.log(doc.data());
                    return(doc.data())
                }))
            })
        }
        return()=>{
            unsubscribe()
        }
    },[postId])

    const postComment = ()=>{
        console.log('Comment Posted');
        db.collection('posts').doc(postId).collection('comments').add({
            comment:comment,
            username:user.displayName
        })
        setComment('')
    }
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
             <div className="com">
                        {
                            comments.map((comment,cId)=>{
                                return(
                                    <p key={cId}>
                                        <strong>{comment.username}</strong> {comment.comment}
                                    </p>
                                )
                            })
                        }
                    </div>
            {
                user && (
                    <div className="comments">
                        <input className="post_input" type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment ... " />
                        <Button className="post_button" disabled={!comment} onClick={postComment} > Post</Button>
                    </div>
                )
            }
        </div>
    )
}

export default Post
