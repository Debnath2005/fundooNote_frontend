import React, { useState } from 'react'
import './SignUp.css'
import sign_up from "../../Assest/sign_up.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signupApiCall } from '../../utils/Api';
const SignUp = () => {
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
    const navigate=useNavigate();
    const service="advance";

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!firstName){
            return alert('first Name is required !');
          }
      
          if(!lastName){
            return alert('last Name is required !');
          }
      
          if(!email){
            return alert('email is required !');
          }
      
          if(!password){
            return alert('password is required !');
          }
      
          if(!confirm){
            return alert('confirm password is required !');
        }
           
      if(password!==confirm){
        return alert('password and confirm password is not same !')
      }
      signupApiCall({firstName,lastName,service,email,password},`user/userSignUp`)
      .then((result)=>{
        const {data}=result
          if(data.message==="User Succesfully Created !"){
            alert("User Succesfully Created !")
            navigate("/")
          }
          else{
            alert("User Not Created !")
          }
          console.log(data);
          
      })
      .catch((error)=>{
       console.log(error)
       alert("User Not Created due to backend Error!")
      })
    }

  return (
    <div className='signup-wapper-cnt'>
        <div className='signup-main-cnt'>
           <div className='signup-input-cnt'>
            <div className='signup-input-header-cnt'>
                <h2>Fundo</h2>
                <h3>Create your Fundo Account</h3>
            </div>
            <div className='signup-input-form-cnt'>
                <div className='signup-input-field-cnt'>
                    <div className="signup-input-name-cnt">
                        <TextField id="outlined-basic-firstname" label="First name*" onChange={(e)=>setFirstName(e.target.value)} className='signUp-firstnamefield-cnt'/>
                        <TextField id="outlined-basic-lastname" label="Last name*" onChange={(e)=>setLastName(e.target.value)} className='signUp-lastnamefield-cnt'/>
                    </div>
                    <TextField id="outlined-basic-usernamename" label="Username*" onChange={(e)=>setEmail(e.target.value)} className='signUp-Usernamenamefield-cnt'/>
                    <span>you can use letter,number & period</span>
                    <div className='signup-password'>
                        <div className="signup-input-password-cnt">
                        <TextField id="outlined-basic-password" label="Password*" type='password' onChange={(e)=>setPassword(e.target.value)} className='signUp-passwordfield-cnt'/>
                        <TextField id="outlined-basic-cnfPassword" label="Confirm*" onChange={(e)=>setConfirm(e.target.value)} className='signUp-cnfPasswordfield-cnt'/>
                        </div>
                        <span>use 8 or more character with a mix of letter number and symbol</span>
                    </div>

                    <div className='signup-button-cnt'>
                        <span id='span-btn' onClick={()=>navigate('/')}>Sign in instead</span>
                        <Button type='submit' variant="contained" className="register-button-cnt" id='register-cnt' onClick={handleSubmit}>Register</Button>
                    </div>
                </div>
                <div className='signup-input-img-cnt'>
                    <img src={sign_up} alt="" />
                    {/* <h3>One account. All Fundo working for you</h3> */}
                </div>
            </div>
           </div>
           <div className='signup-footer-cnt'></div>
        </div>  
    </div>
  )
}

export default SignUp