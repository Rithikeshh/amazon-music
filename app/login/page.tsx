'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import "./Login.css"
import { useAuth } from '../providers/AuthProvider';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import getHeaderWithProjectId from '../utils/headerWithProjectId';
import { useAskForSign } from '../providers/AskForSignProvider';


function Login() {

    const isLoggedIn = useAuth()?.isLoggedIn;
    const setIsLoggedIn = useAuth()?.setIsLoggedIn;
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const [emailAlert, setEmailAlret] = useState("");
    const [passwordAlert, setPasswordAlret] = useState("");
    const [incorrectDetails, setIncorrectDetails] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const setAskForSignInModal  = useAskForSign()?.setAskForSignInModal
   
    
    const loginUser = async ()=>{

        const config = getHeaderWithProjectId()
        
        try {
            const response = await axios.post(
            "https://academics.newtonschool.co/api/v1/user/login", 
            {...userDetails, "appType": "music"},
            config
            );
            
            const token = response.data.token;
            if(token){
                localStorage.setItem('userToken-amazon-music', token);
                localStorage.setItem('userDetails-amazon-music', JSON.stringify({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    id: response.data.data._id
                }));
                setIsLoggedIn && setIsLoggedIn(true)
               
            }
        } catch (error:any) {
            try{
                if(error.response.data.message == 'Incorrect EmailId or Password')
                setIncorrectDetails(true)
                else
                setServerError(true)
            }
            catch(error){
                setServerError(true)
            }
        }
    }

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if(userDetails.email === ""){
            setEmailAlret("Please enter your email")
            setPasswordAlret("")
            emailRef.current?.focus()
        }
        else if(!emailRegex.test(userDetails.email)){
            setEmailAlret("Please enter a valid email address")
            setPasswordAlret("")
            emailRef.current?.focus()
        }
        else if(userDetails.password === ""){
            setPasswordAlret("Please enter a password")
            setEmailAlret("")
            passwordRef.current?.focus()

        }
        else if(userDetails.password.length < 6){
            setPasswordAlret("The password you provided must have at least 6 characters")
            setEmailAlret("")
            passwordRef.current?.focus()
        }
        else{
            setEmailAlret("")
            setPasswordAlret("")
            loginUser()
        }
        setIncorrectDetails(false)
        setServerError(false)
    }
    const handleInputs = (e:any)=>{
        setUserDetails(prev=>{
            return{...prev,[e.target.name]:e.target.value}
        })
    }
    useEffect(()=>{
        emailRef.current?.focus()
        setAskForSignInModal(false)
    },[])
  return (
    isLoggedIn ? 
    redirect('/')
    :
    <div className='login-form-container'>
        <header className='login-signup-header'>
            <Link className='login-signup-linkedin-icon-container' href="/">
                <div className='header-home-icon'>
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG13.png" alt="" />
                </div>
                
            </Link>
        </header>
        <div className='login-signup-form-container'>
            <div className='login-signup-heading'>
                <h1>Sign in</h1>
                <p>Stay updated with latest songs</p>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <div className={`login-signup-form-input ${emailAlert ? "login-signup-form-input-alert" : ""}`}>
                    <input className='login-inputs' ref={emailRef} onChange={handleInputs} placeholder='' value={userDetails.email} type="email" name="email" id='email'/>
                    <label htmlFor="email">Email</label>
                    <p style={{marginTop:"4px"}} className='input-helper'>{emailAlert}</p>
                </div>
                <div className={`login-signup-form-input ${passwordAlert ? "login-signup-form-input-alert" : ""}`}>
                    <input className='login-inputs' ref={passwordRef} onChange={handleInputs} placeholder='' value={userDetails.password}  type={showPassword ? "text":"password"} name="password" id='password'/>
                    <label htmlFor="password">Password</label>
                    <span className='show-password' onClick={()=>setShowPassword(n=>!n)}>{showPassword ? "Hide" : "Show"}</span>
                    <p style={{marginTop:"4px"}} className='input-helper'>{passwordAlert}</p>
                    {serverError && <p className='input-helper'>Something went wrong please try later</p>}
                    {incorrectDetails && <p className='input-helper'>Incorrect EmailId or Password</p>}
                </div>
                <Link href='#'>
                    <span className='login-forget-btn'>Forgot password?</span>
                </Link>
                <div>
                    <button className='login-signup-btn' type='submit'>Sign in</button>
                </div>
                <div className='login-form-divider'>
                    <p>or</p>
                </div>
            </form>
            <div className='google-auth-btn'>
                <p>By clicking Continue, you agree to Amazon’s <span>User Agreement</span>, <span>Privacy Policy</span>, and <span>Cookie Policy</span>.</p>
            </div>
        </div>
        <div className='login-to-signin'>New to Amazon? <span onClick={(e)=>{
            router.push("/signup")
        }}>Join now</span></div>
    </div>
  )
}

export default Login

