import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Projectcards from '../components/Projectcards'
import { Link } from 'react-router-dom'
import homepageImage from '../assets/img1.jpeg'
import { homeProjectAPI } from '../services/allAPI'

function Home() {
    //we need to change Get started button to Manage projects,id user logged in
    const [isLogin, setisLogin] = useState(false)
    const [homeProject,setHomeProject]=useState()
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setisLogin(true)
        }
    },[])
    const getHomeProject=async()=>{
        const result=await homeProjectAPI()
        console.log("===home project===");
        console.log(result);
        setHomeProject(result.data)
    }
    useEffect(()=>{
        getHomeProject()
    })
   
    return (
        <>
            <div className='mb-5 bg-success' style={{ width: "100%", height: "80vh" }}>
                <div className='container-fluid rounded'>
                    <Row className='align-items-center p-5'>
                        <Col sm={12} md={6} lg={6}>
                            <h1 className='text-light mb-3' style={{ fontSize: "70px", fontWeight: "600" }}>Project Fair</h1>
                            <p>One stop destination for all software development projects</p>
                            {
                                isLogin == true ?
                                    <Link to={'/dashboard'}>
                                        <button className='btn btn-warning rounded'>Manage Projects<i class="fa-solid fa-arrow-right ms-2"></i></button>
                                    </Link> :
                                    <Link to={'/login'}>
                                        <button className='btn btn-warning rounded'>Get Started<i class="fa-solid fa-arrow-right ms-2"></i></button>
                                    </Link>
                            }


                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <img src={homepageImage} alt="" height={"380px"} style={{ marginTop: "50px" }} />
                        </Col>
                    </Row>

                </div>
            </div>
            <div className='mt-5 allProject'>
                <div className='text-center'>
                    <h1>Explore Our Project</h1>

                    <marquee scrollAmount={20}>
                        <div className='d-flex'>
                            {
                            homeProject?.length>0?
                            homeProject.map((item)=>(
                                <div className='ms-5' style={{ width: "400px" }}>

                                <Projectcards project={item} />
                            </div>
                            )):
                            <p>No projects found</p>
                        }
                           
                       


                        </div>
                    </marquee>

                    <div className='text-center mt-5'>
                        <h6> <Link to={'/project'}>see more projects</Link></h6>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Home