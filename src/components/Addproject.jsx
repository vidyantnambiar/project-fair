import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addprojectAPI } from '../services/allAPI';
import { addprojectResponseContext } from '../context/ContextShare';


function Addproject() {
  // useContext() is used to access context api
  const {addprojectResponse,setaddprojectResponse}=useContext(addprojectResponseContext)

  const [projectDetails, setprojectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })
  const [token,setToken]=useState("");

  const [preview, setPreview] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  const handleCloseClear = () => {
    setprojectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")
  }
  useEffect(()=>{
    if(sessionStorage.token){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, language, github, website, overview, projectImage } = projectDetails;
    if (!title || !language || !github || !website || !overview || !projectImage) {
      alert("please fill the form completely")
    }
    else {
      console.log("===final data to upload===");
      console.log(projectDetails);
      const reqBody=new FormData();
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await addprojectAPI(reqBody, reqHeader)
      console.log(result)
      if(result.status==200){
        setaddprojectResponse(result)
        alert("project added successfully")
        handleCloseClear()
        handleClose()
      }
      else{
        alert(result.response.data) 
      }
    }
  }
  return (
    <>
      <Button variant="success" onClick={handleShow}>Add Project</Button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <label htmlFor="project-image" className='btn'>
                <input id='project-image' type="file" style={{ display: "none" }}
                  onChange={(e) => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                />
                <img height={"200px"} width={"200px"} src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_640.png"} alt="" />
              </label>
            </div>
            <div className='col-lg-6 col-md-6 d-flex justify-content-center align-items-center flex-column'>
              <div className='mb-3 mt-3 w-100'>
                <input type="text" className='form-control' placeholder='Project Title'
                  onChange={(e) => setprojectDetails({ ...projectDetails, title: e.target.value })}
                  value={projectDetails.title}
                />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <input type="text" className='form-control' placeholder='Technology Used'
                  onChange={(e) => setprojectDetails({ ...projectDetails, language: e.target.value })}
                  value={projectDetails.language}
                />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <input type="text" className='form-control' placeholder='Github Link'
                  onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })}
                  value={projectDetails.github}
                />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <input type="text" className='form-control' placeholder='Website Link'
                  onChange={(e) => setprojectDetails({ ...projectDetails, website: e.target.value })}
                  value={projectDetails.website}
                />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <textarea name="" className='form-control'
                  placeholder='Project Description'
                  onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })}
                  value={projectDetails.overview}>

                </textarea>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Addproject