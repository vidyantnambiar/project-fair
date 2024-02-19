import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from '../assets/img2.jpeg'
import Header from '../components/Header';
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';
//both login page and register page are almost same,so here we use a single page
//and change the content inside that 
function Auth({ register }) {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  const navigate=useNavigate();
  const registerForm = register ? true : false;
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("===user details===");
    console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("please fill the form completely")
    }
    else {
      //call function to insert user details
      const result = await registerAPI(userData)
      if (result.status === 200) {
        alert("user registered successfully")
        setuserData({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        alert(result.response.data)
      }
    }
  }
  const handleLogin =async(e) => {
    e.preventDefault()
    const { password, email } = userData;
    if (!password || !email) {
      alert("please fill the form completely")
    }
    else {
      const loginResult =await loginAPI(userData)
      if(loginResult.status==200){
        sessionStorage.setItem("existingUser",JSON.stringify(loginResult.data.existingUser))
        sessionStorage.setItem("token",loginResult.data.token)
        setIsAuthToken(true)
        navigate('/')

        console.log();
      }
      else{
        alert(loginResult.response.data)
      }
     
    }
  }
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "100vh" }}>
        <div className='container w-75'>
          <Link to={'/'} style={{ textDecoration: "none", color: "blue" }}><i class="fa-solid fa-arrow-left"></i>Back to Home</Link>
          <div className='bg-success p-5 rounded mt-3'>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6'>
                <img src={authImage} width={"100%"} alt="" />
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='d-flex align-items-center flex-column'>
                  <h3 className='text-light'><i class="fa-brands fa-stack-overflow me-3 "></i>Project Fair</h3>
                  <h5 className='text-light mt-3'>{
                    registerForm ? "Sign up your account" : "Sign in your account"
                  }
                  </h5>
                  <Form>
                    {
                      registerForm &&

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                          onChange={(e) => setuserData({ ...userData, username: e.target.value })}
                          value={userData.username} />

                      </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" placeholder="Email"
                        onChange={(e) => setuserData({ ...userData, email: e.target.value })}
                        value={userData.email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="password"
                        onChange={(e) => setuserData({ ...userData, password: e.target.value })}
                        value={userData.password} />

                    </Form.Group>
                    {
                      registerForm ?
                        <div>
                          <button className='btn btn-warning mt-3' onClick={handleRegister}>Register</button>
                          <p>Already a User?Click here to <Link to={'/login'} style={{ color: "blue" }}>Login</Link> </p>


                        </div> :
                        <div>
                          <Link to={'/dashboard'}>
                            <button className='btn btn-warning mt-3' onClick={handleLogin}>Login</button>
                          </Link>
                          <p>New User?Click here to <Link to={'/register'} style={{ color: "blue" }}>Register</Link> </p>
                        </div>
                    }

                  </Form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth