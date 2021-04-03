import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Post from './components/Post';
import {auth, db} from './components/Firebase'
import { Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import image from './images/logo.png'
import PostUpload from './components/PostUpload';
// import SignUp from './components/SignUp';

function App() {
  const [posts,setPosts] = useState([])
  const [open,setOpen] = useState(false)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [openSignIn,setOpenSignIn] = useState(false)
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(authUser=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser)
        if(authUser.displayName){
          // console.log(authUser.displayName)
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
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
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
    setOpen(false)
  } 

  const signin = (e)=>{
    e.preventDefault()
    console.log('SignIn');
    auth.signInWithEmailAndPassword(email,password).catch(error=>alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className="App">
      <Navbar />
      <div className="buttons">
        {
          user ? (<Button className="modal" onClick={()=>auth.signOut()} >Logout</Button>)
          :(
            <div className="signIn">
              <Button className="modal" onClick={()=>setOpen(true)} >Sign Up</Button>
              <Button className="modal" onClick={()=>setOpenSignIn(true)} >Sign In</Button>
            </div>
          )
        }
      </div>
      {user?.displayName ? (<PostUpload username={user.displayName}/>) :( <span></span> )}
      

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="signup_form">
            <center>
              <img src={image} alt=""/>
            </center>
            <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <Button onClick={signin} >SignIn</Button>
          </form>
        </div>
      </Modal>

      

      {
        posts.map(({id,post})=>
          <Post key={id} postId={id} user={user} username={post.username} image_url={post.image_url} caption={post.caption} />
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
