import { Routes, Route } from "react-router-dom"
import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./home/home"
import Books from "./books/index-book"
import AllBook from "./books/all-book"
import NotFound from "./components/notfound"
import Authors from "./authors/index-author"
import Rents from "./rents/index-rent"
import Perfil from "./users/index-perfil"
import OneBook from "./books/onebook"

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* Home */}
        <Route path='/' element={<Home />} />


        {/* Books */}
        <Route path="book" element={<Books />} />
        <Route path="allbook" element={<AllBook />} />
        <Route path="book/:id" element={<OneBook />} />

        {/* Authors */}
        <Route path="/author" element={<Authors />} />


        {/* Rents */}
        <Route path="/rent/:id" element={<Rents />} />

        {/* User */}
        <Route path="/user/:id" element={<Perfil />} />

        {/* Notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
