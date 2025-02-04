import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./pages/ProtectedRoute"
import Dashboard from "./pages/protected/Dashboard"
import AddEvents from "./pages/protected/AddEvents"
import UserEvents from "./pages/protected/UserEvents"
import AllEvents from "./pages/protected/AllEvents"
import Event from "./pages/protected/Event"
import Chat from "./pages/protected/Chat"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path='/events' element={<ProtectedRoute element={<AllEvents />}/>} />
        <Route path='/add-events' element={<ProtectedRoute element={<AddEvents />}/>} />
        <Route path='/events/event/:eventId' element={<ProtectedRoute element={<Event />} />} />
        <Route path='/my-events' element={<ProtectedRoute element={<UserEvents />} />} />
        <Route path='/chat' element={<ProtectedRoute element={<Chat />} />} />
      </Routes>
    </Router> 
  )
}

export default App