import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import AboutPat from './pages/AboutPat'
import PacMan from './pages/PacMan'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pat" element={<AboutPat />} />
          <Route path="/game" element={<PacMan />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
