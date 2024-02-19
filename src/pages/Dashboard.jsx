import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'
import { Row,Col } from 'react-bootstrap'

function Dashboard() {
  const [username,setUsername]=useState("")
  useEffect(()=>{
    const existingUserData=JSON.parse(sessionStorage.getItem("existingUser"))
    console.log(existingUserData);
    setUsername(existingUserData.username)
  },[])
 

  return (
    <>
    <Header logout={'logout'}/>
    <h2 className='mt-5 ms-3'>Welcome <span style={{color:"orange"}}>{username}</span></h2>
    <Row className='container-fluid mt-5'>
      <Col md={8}>
        <Myproject/>
      </Col>
    <Col>
    <Profile/>
    </Col>
    </Row>
    </>
  )
}

export default Dashboard