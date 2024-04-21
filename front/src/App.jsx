import { Routes, Route, Router, useLocation } from 'react-router-dom'
import EditAuthor from './pages/author/authorEdit'
import BooksId from './pages/books/bookId/booksId'
import AllAuthors from './pages/author/allAuthor'
import EditPerfil from './pages/user/editPerfil'
import NewAuthor from './pages/author/newAuthor'
import 'react-toastify/dist/ReactToastify.css';
import EditBooks from './pages/books/editBooks'
import { ToastContainer } from 'react-toastify';
import NewBooks from './pages/books/newBooks'
import Allbooks from './pages/books/allBooks'
import Register from './pages/user/register'
import React, { useEffect } from 'react';
import Navbar from './components/Navbar'
import Perfil from "./pages/user/perfil"
import Footer from './components/Footer'
import Books from "./pages/books/books"
import Rents from './pages/rents/rents'
import About from './pages/home/about'
import Login from "./pages/user/login"
import Home from "./pages/home/home"

import AllRents from './pages/rents/allrents'
import EditRent from './pages/rents/editRents'


function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      {/* Home */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>

      {/* Books */}
      <Routes>
        <Route path='/books' element={<Books />} />
        <Route path='/books/new' element={<NewBooks />} />
        <Route path='/books/allbooks' element={<Allbooks />} />
        <Route path="/books/:id" element={<BooksId />}></Route>
        <Route path="/books/:id/edit" element={<EditBooks />}></Route>
      </Routes>

      {/* User */}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/perfil/:id' element={<Perfil />} />
        <Route path='/user/perfil/:id/edit' element={<EditPerfil />} />
      </Routes>

      {/* Rents */}
      <Routes>
        <Route path='/rents/:id' element={<Rents />} />
        <Route path='/rents/allrents' element={<AllRents />} />
        <Route path='/rents/:id/edit' element={<EditRent />} />

      </Routes>

      {/* Author */}
      <Routes>
        <Route path='/author' element={<AllAuthors />} />
        <Route path='/author/new' element={<NewAuthor />} />
        <Route path='/author/:id/edit' element={<EditAuthor />} />
      </Routes>


      <Footer />
      <ToastContainer />
    </>
  );
}

export default App
