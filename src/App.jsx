import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import PokemonPage from "./pages/PokemonPage"

function App() {  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon" element={<PokemonPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
