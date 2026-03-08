import { Routes, Route } from 'react-router-dom'
import Landing from './routes/Landing'
import Upload from './routes/Upload'
import Dashboard from './routes/Dashboard'
import Analysis from './routes/Analysis'
import Wallet from './routes/Wallet'
import Login from './routes/Login'
import Register from './routes/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/:id" element={<Analysis />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
