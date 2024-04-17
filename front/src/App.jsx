import { Routes, Route } from "react-router-dom"
import Home from "./home/home"
import NavBar from "./components/navbar"
import Footer from "./components/footer"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
