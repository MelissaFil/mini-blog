import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContex';
import { useEffect, useState } from 'react';
import { useAuthentication } from './hooks/userAuthentication';
import { onAuthStateChanged } from 'firebase/auth';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined 

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}></Route> 
              <Route path='/about' element={<About/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/cadastrar' element={<Register/>}></Route>
              <Route path='/posts/create' element={<CreatePost/>}></Route>
              <Route path='dashboard' element={<Dashboard/>}></Route>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>    
      </AuthProvider>
    </div>
  );
}

export default App;
