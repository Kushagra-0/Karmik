import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./pages/ProtectedRoute"
import Dashboard from "./pages/protected/Dashboard"
import Events from "./pages/protected/Events"
import AddEvents from "./pages/protected/AddEvents"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path='/events' element={<ProtectedRoute element={<Events />}/>} />
        <Route path='/add-events' element={<ProtectedRoute element={<AddEvents />}/>} />
      </Routes>
    </Router> 
  )
}

export default App