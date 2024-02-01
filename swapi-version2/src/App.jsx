import './App.css'
import { Routes, Route, Link} from 'react-router-dom'

// page imports
import HomePage from './pages/HomePage'
import CharacterPage from './pages/CharacterPage'
import FilmPage from './pages/FilmPage'
import PlanetPage from './pages/PlanetPage'

function App() {

  return (
    <>
      <h1> Star Wars API Viewer </h1>
      <button><Link to="/">Home</Link></button>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="characters/:id" element={<CharacterPage />}/>
        <Route path="/films/:id" element={<FilmPage />}/>
        <Route path="/planets/:id" element={<PlanetPage />}/>
      </Routes>
    </>
  )
}

export default App
