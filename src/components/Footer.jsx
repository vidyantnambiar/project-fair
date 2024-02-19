import React from 'react'
import { Link } from 'react-router-dom';


function Footer() {
  
  return (
    <>
    <div className='footer d-flex align-items-center justify-content-evenly w-100 bg-success'>
      <div style={{ width: "400px" }}>
        
        <h4>
          <Link to={'/'} style={{color:"white",textDecoration:"none"}}><i class="fa-brands fa-stack-overflow me-3 "></i>
         Project Fair</Link></h4>
        <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius suscipit
          eveniet placeat pariatur expedita dignissimos provident autem minima explicabo sequi minus
          iure similique commodi in fuga cumque, esse nihil rerum.</h6>
      </div>
      <div>
        <h4 >Links</h4>
        <Link to={'/'} style={{textDecoration:"none",color:"white"}}> <h6>Home</h6></Link>
       <Link to={'/register'} style={{textDecoration:"none",color:"white"}}><h6>Register</h6></Link>
       <Link to={'/login'} style={{textDecoration:"none",color:"white"}}><h6>Login</h6></Link>
       
        
      </div>

      <div>
        <h4>Guides</h4>
        <h6>React</h6>
        <h6>ReactBootstrap</h6>
        <h6>Bootswatch</h6>
      </div>
      <div>
        <h4>Contact Us</h4>
        <div className='d-flex'>
          <input className='form-control' type="text" name='' id='' placeholder='Enter your email' />
          <button className='btn btn-warning ms-2'>Subscribe</button>
        </div>
        <div className='d-flex justify-content-evenly mt-5'>
        <i class="fa-brands fa-instagram fa-xl"></i>
        <i class="fa-brands fa-twitter fa-xl"></i>
        <i class="fa-brands fa-linkedin fa-xl"></i>
        <i class="fa-brands fa-facebook fa-xl"></i>
        </div>
      </div>
    </div>
    <div className='text-center'>
      <p>Copyright &#169; 2024.Project Fair built with React</p>
    </div>

  </>
  )
}

export default Footer