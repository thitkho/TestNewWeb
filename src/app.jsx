import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
// Home function that is reflected across the site
export default function Home() {
  return (
    <div>
      <label>Tan dep trai</label>
      <ConnectFirebase />
    </div>
  );
}
//connect/firebase
const ConnectFirebase = () => {
  <Routes>
    <Route path='*' element={<HomePage/>}></Route>
    <Route path='/signup' element={<SignUp />}></Route>
    <Route path='/signin' element={<SignIn />}></Route>
    <Route path='/dashboard' element={
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    }/>
  </Routes>
}
const HomePage = () => {
    return(
        <div>
            <h1> Home Page</h1>
       </div>
    )
}
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {

    // const emailRef = useRef(null);
    // const emailPassword = useRef(null);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        console.clear("test:");
        event.preventDefault();
        // const { email, password } = event.target.elements;
        // console.log(email.value, password.value);
        // console.log(emailRef.current.value, emailPassword.current.value);
        // console.log(email, password);

        //firebase
        const { email, password } = event.target.elements;
        // firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
        // auth.createUserWithEmailAndPassword
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential)=>{
                //signed in
                const user = userCredential.user;
                // console.log("user: ", user);
                navigate("/dashboard")
            })
            .catch((error)=>{
                // const errorCode = error.code;
                const errorMessage = error.message;
                // console.log("errorMessage: ", errorMessage);
            })
    }
    // const handleChangeEmail = (event) => {
    //     // setEmail(event.currentTarget.value);
    //   };
    //   const handleChangePassword = (event) => {
    //     // setPassword(event.currentTarget.value);
    //   };

    // TODO: project
    return(
    <div>
        <h1>user register</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>メールアドレス</label>
            <input 
                name="email" 
                type="email" 
                placeholder="email" 
                // ref={emailRef}
                // onChange={(event)=>handleChangeEmail(event)}
            />
            </div>
            <div>
            <label>パスワード</label>
            <input 
                name="password" 
                type="password" 
                // ref={emailPassword}
                // onChange={(event)=>handleChangePassword(event)}
            />
            </div>
            <div>
            <button>登録</button>
            </div>
        </form>
    </div>
    )
}