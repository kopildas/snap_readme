import { useState } from 'react'
import { BrowserRouter as Router,
  Routes,
  Route,
  useLocation, } from 'react-router-dom'
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";import './App.css'
import Home from './Page/Home/Home';
import Header from './Components/Header/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <div className="w-full h-auto flex flex-col bg-zinc-800">

   <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
   </Router>

   <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

   </div>
   </>
  )
}

export default App
