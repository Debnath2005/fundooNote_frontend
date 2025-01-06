import React, {useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import {loginApi} from '../../utils/Api'
//import { ForgetPwdApi, LoginApi} from '../../utils/Api';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const navigate=useNavigate()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!email.length){
        //     setErrorEmail(true);
        //     return
        // }
        // else{
        //     setErrorEmail(false);
        // }
        // if(!password.length){
        //     setErrorPassword(true);
        //     return
        // }
        // else{
        //     setErrorPassword(false);
        // }

        let checkRegex = emailRegex.test(email);
        setErrorEmail(!checkRegex);
        if(!checkRegex){
            setErrorEmail(true);
            return;
        };
        if(password === ""){
            setErrorPassword(true);
            return; 
        };
        if(!errorEmail || !errorPassword){
            console.log(email);
            console.log(password);
            
            try{
                const fundoo_token = await getToken({'email': email, 'password': password});  
                //console.log(fundoo_token);
                              
                localStorage.setItem("fundoo-token", fundoo_token);
                navigate('/Dashboard/notes')
            }catch(error){
                console.error(error);
            }
        }
        
    }

    async function getToken(obj){
        //console.log(obj);
        const payload = await loginApi(obj,'/user/login');
        console.log(payload.data);
        localStorage.setItem("FirstName", payload.data.firstName);
        localStorage.setItem("LastName", payload.data.lastName);
        localStorage.setItem("Email", payload.data.email);
        return payload?.data?.id;
    };

    
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className='login-wrapper-cnt'>
            <div className='login-columncnt-cnt'>
                <div className='login-headercnt-cnt'>
                    <span className="login-firstHeader-cnt">Fundo</span> 
                    <span className="login-secondHeader-cnt">Sign In</span>
                    <span className="login-thirdHeader-cnt">Use your Fundo Account</span>
                </div>
                <TextField id="outlined-basic-email" label="Email or phone*" className='signUp-emailfield-cnt'onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
                {errorEmail && <span id='errorEmailCnt' style={{color:'red'}}>Error! Email is required.</span>}
                <TextField id="outlined-basic-password" label="Password*" type='password' className='signUp-passwordField-cnt'onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                {errorPassword && <span id='errorPasswordCt' style={{color:'red'}}>Error! Password is empty!</span>}
                <span className="login-forgetPasswordLink-cnt" >Forget password</span>
                <div className='login-linkSection-cnt'>
                    <span className="login-createAccountLink-cnt" onClick={()=>navigate('/signup')}>Create account</span>
                    <Button type='submit' variant="contained" className="login-loginbutton-cnt" id='login-cnt'>Login</Button>
                </div>

            </div>

            <div className='login-footercnt-cnt'>
                <FormControl className='login-languagedropdown-cnt'>
                    <InputLabel className='login-optionsLanguage-cnt'>Language</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" className='login-dropdown-cnt'>
                    <MenuItem>English (United States)</MenuItem>
                    <MenuItem>English (India)</MenuItem>
                    </Select>
                </FormControl>
                <div className="login-rightfooter-cnt">
                    <span>Help</span>
                    <span>Privacy</span>
                    <span>Terms</span>
            </div>
            </div>
        </div>
    </form>
   </>
)
}

export default Login