
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';

function App() {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  return (

    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/login' element={<Auth />} />
       
        <Route path='/register' element={<Auth register={"register"} />} />
        <Route path='/project' element={<Project/>} />
        <Route path='/dashboard' element={isAuthToken?<Dashboard/>:<Home/>}/>

      </Routes>

      <Footer />
    </div>

  );
}

export default App;
