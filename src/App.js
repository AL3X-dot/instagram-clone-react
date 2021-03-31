import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Post from './components/Post';
import {auth, db} from './components/Firebase'
import { Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import image from './images/logo.png'
// import SignUp from './components/SignUp';

function App() {
  const [posts,setPosts] = useState([])
  const [open,setOpen] = useState(false)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(authUser=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser)
        if(authUser.displayName){
          console.log(authUser.displayName)
        }else{
          authUser.updateProfile({
            displayName:username
          })
        }

      }else{
        setUser(null)
      }
    })
    return ()=>{
      unsubscribe()
    }
  },[user,username])

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })
      ))
    })
  },[])

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const signup = (e)=>{
    e.preventDefault()
    console.log("Form Submitted");
    auth.createUserWithEmailAndPassword(email,password).then().catch(error=>{
      console.log(error.message);
    })
  } 

  return (
    <div className="App">
      <Navbar />
      <Button className="modal" onClick={()=>setOpen(true)} >Sign Up</Button>

      {
        posts.map(({id,post})=>
          <Post key={id} username={post.username} image_url={post.image_url} caption={post.caption} />
        )
      }
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="signup_form">
            <center>
              <img src={image} alt=""/>
            </center>
            <Input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
            <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <Button onClick={signup} >Signup</Button>
          </form>
        </div>
      </Modal>

    </div>
  );
}

export default App;
