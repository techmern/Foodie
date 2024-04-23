import React,{useState} from 'react'
import './style.css'

function Login_Restaurant() {
    const [emailid, setEamilid] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className='bodybg'>
            
    <h1><span>L</span>ogin <span>F</span>rom</h1>
    <div class="wthree-form">

        <h2>Fill out the form below to login</h2>
        <div class="w3l-login form">

            <form>
                <div class="form-sub-w3">
                    <input type="text" name="emailid" id="emailid" placeholder="Email Id" required=""value={emailid} />
                </div>
                <div class="form-sub-w3">
                    <input type="password" name="password" id="password" placeholder="Password" required="" value={password}/>
                </div>
                <label class="anim">
                    <input type="checkbox" class="checkbox" />
                    <span>Remember Me</span>
                </label>
                <div class="submit-agileits">
                
                <input type="button" value="Login" />
                </div>
                <a href="">Forgot Password ?</a><br /><br />
                <p>Create an Account <a href="" >Sign Up</a></p>
            
            </form>
            <br/>
           
        </div>
    </div>
</div>
  )
}

export default Login_Restaurant