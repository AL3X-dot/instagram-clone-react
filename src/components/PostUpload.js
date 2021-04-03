import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { storage, db } from './Firebase'
import firebase from 'firebase'
import '../css/PostUpload.css'
function PostUpload({username}) {
    const [image,setImage] = useState(null)
    const [progress,setProgress] = useState(0)
    const [caption,setCaption] = useState('')
    const handleFile = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
        console.log('File uploaded');

    }
    const upload = (e)=>{
        console.log('Post');
        const uploadTask = storage.ref(`Images/${image.name}`).put(image)
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            setProgress(progress)
        },(error)=>{
            alert(error.message)
        },()=>{
            storage.ref('Images').child(image.name).getDownloadURL().then(url=>{
                db.collection('posts').add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    caption:caption,
                    image_url:url,
                    username:username
                })
            })
            setProgress(0)
            setImage(null)
            setCaption('')
        })
    }
    return (
        <div className='post_upload'>
            <progress value={progress} max='100' ></progress>
            <input type="text" placeholder="Enter a caption ... " value={caption} onChange={(e)=>setCaption(e.target.value)} />
            <input type="file" onChange={handleFile} />
            <Button onClick={upload} > Post </Button>
        </div>
    )
}

export default PostUpload
