import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import Projectcards from '../components/Projectcards'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken,setisToken]=useState(false);
  const [searchkey,setSearchkey]=useState((""))
  const [allProjects,setAllProjects]=useState([])
  const getAllProject=async()=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    
    const result=await allProjectAPI(searchkey,reqHeader);
    console.log(result.data);
    setAllProjects(result.data)
  }}
  useEffect(()=>{
    getAllProject()
  
  },[searchkey])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setisToken(true)
    }
  },[])
  console.log('====search key===',searchkey);
  return (
    <>
    <Header/>
    <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
      <h3>All Projects</h3>
      <div className={'d-flex mt-5 w-25'}>
        <input onChange={(e)=>setSearchkey(e.target.value)} type="text" className='form-control' placeholder='search project using technology' />
        <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:"-40px",color:"lightblue"}}></i>
      </div>
    </div>
    <Row className='mt-5 mb-5 ms-5'>
     
        {
          allProjects?.length>0?
          allProjects.map((item)=>(
            <Col md={6} lg={4}>
            <Projectcards project={item}/> 
            </Col>
          )):
          <div>
            {
              isToken?
              <p>No projects uploaded yet</p>:
              <div className='d-flex justify-content-center align-items-center flex-column'>
                <img src="https://as2.ftcdn.net/v2/jpg/04/60/71/01/1000_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg" alt="" height={"400px"} width={"600px"} />
                <p className='text-danger fs-3 mt-4 ms-3'>Please<Link style={{textDecoration:"none",color:"blue"}} to={'/login'}>Login</Link>to view projects</p>
              </div>
            }
          </div>
         
        }
        

    </Row>
    </>
  )
}

export default Project