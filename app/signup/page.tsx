'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import "./Signup.css"
import "../login/Login.css"
import { useAuth } from '../providers/AuthProvider';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import getHeaderWithProjectId from '../utils/headerWithProjectId';
import { useAskForSign } from '../providers/AskForSignProvider'


function Signup() {
    const isLoggedIn = useAuth()?.isLoggedIn;
    const setIsLoggedIn = useAuth()?.setIsLoggedIn;
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [usernameAlert, setUsernameAlret] = useState("");
    const [emailAlert, setEmailAlret] = useState("");
    const [passwordAlert, setPasswordAlret] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const setAskForSignInModal  = useAskForSign()?.setAskForSignInModal

    
    const signupUser = async ()=>{

        const config = getHeaderWithProjectId()
        try {
            const response = await axios.post(
            "https://academics.newtonschool.co/api/v1/user/signup", 
            {...userDetails, "appType": "music"},
            config
            );
            console.log(response);

            
            const token = response.data.token;
            if(token){
                localStorage.setItem('userToken-amazon-music', token);
                localStorage.setItem('userDetails-amazon-music', JSON.stringify({
                    name: response.data.data.user.name,
                    email: response.data.data.user.email,
                    id: response.data.data.user._id
                }));
                setIsLoggedIn && setIsLoggedIn(true)
               
            }
        } catch (error:any) {
            console.log(error);
            if(error.response.data.message === 'User already exists')
            setPasswordAlret("User already exists")
            else
            setPasswordAlret("Something went wrong please try later")
        }
    }
    const handleSubmit = (e:any)=>{
        e.preventDefault();
        const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if(userDetails.name === ""){
            setUsernameAlret("Please enter your name")
            setEmailAlret("")
            setPasswordAlret("")
            usernameRef.current?.focus()
        }
        else if(userDetails.email === ""){
            setEmailAlret("Please enter your email")
            setPasswordAlret("")
            setUsernameAlret("")
            emailRef.current?.focus()
        }
        else if(!emailRegex.test(userDetails.email)){
            setEmailAlret("Please enter a valid email address")
            setPasswordAlret("")
            setUsernameAlret("")
            emailRef.current?.focus()
        }
        else if(userDetails.password === ""){
            setPasswordAlret("Please enter a password")
            setEmailAlret("")
            setUsernameAlret("")
            passwordRef.current?.focus()

        }
        else if(userDetails.password.length < 6){
            setPasswordAlret("The password you provided must have at least 6 characters")
            setEmailAlret("")
            setUsernameAlret("")
            passwordRef.current?.focus()
        }
        else{
            setEmailAlret("")
            setPasswordAlret("")
            setUsernameAlret("")
            signupUser()
        }
    }
    const handleInputs = (e:any)=>{
        setUserDetails(prev=>{
            return{...prev,[e.target.name]:e.target.value}
        })
    }
    useEffect(()=>{
        setAskForSignInModal(false)
    })
  return (
    isLoggedIn ? 
    redirect('/')
    :
    <div className='login-form-container'>
        <header className='login-signup-header signup-header'>
            <Link className='login-signup-linkedin-icon-container signup-linkedIn-container' href="/">
                <div className='header-home-icon signup-home-icon'>
                    <div className='header-home-icon'>
                        <img src="https://pngimg.com/uploads/amazon/amazon_PNG13.png" alt="" />
                    </div>
                </div>
            </Link>
            <h1 className='signup-heading'>Explore latest musics</h1>
        </header>
        <div className='signup-form-container'>
            <form onSubmit={handleSubmit} noValidate>
                <div className='signup-form-input-container'>
                    <label htmlFor="name">Full name</label>
                    <div className={`signup-text-input ${usernameAlert ? "signup-text-input-alret" : ""}`}>
                        <input ref={usernameRef} style={{textTransform:"capitalize"}} onChange={handleInputs} value={userDetails.name} type="name" id='name' name='name' />
                    </div>
                    <p>{usernameAlert}</p>
                    <label style={{marginTop: "1rem"}} htmlFor="email">Email</label>
                    <div className={`signup-text-input ${emailAlert ? "signup-text-input-alret" : ""}`}>
                        <input ref={emailRef} onChange={handleInputs} value={userDetails.email} type="email" id='email' name='email' />
                    </div>
                    <p>{emailAlert}</p>
                    <label style={{marginTop: "1rem"}} htmlFor="password">Password (6+ characters)</label>
                    <div className={`signup-text-input ${passwordAlert ? "signup-text-input-alret" : ""}`}>
                        <input ref={passwordRef} onChange={handleInputs} value={userDetails.password} type={showPassword ? "text":"password"} id='password' name='password' />
                        <button type='button' onClick={()=>setShowPassword(n=>!n)}>{showPassword ? "Hide" : "Show"}</button>  
                    </div>
                    <p>{passwordAlert}</p>
                </div>
                <p className='signup-policy'>By clicking Continue, you agree to Amazon’s <span>User Agreement</span>, <span>Privacy Policy</span>, and <span>Cookie Policy</span>.</p>
                <div>
                    <button style={{margin: "0"}} className='login-signup-btn' type='submit'>Agree & Join</button>
                </div>
                <div className='login-form-divider'>
                    <p>or</p>
                </div>
                <div className='login-to-signin'>Already on Amazon? <span onClick={(e)=>{
                    router.push('/login')
                }}>Sign in</span></div>
            </form>
        </div>
    </div>
  )
}

export default Signup
