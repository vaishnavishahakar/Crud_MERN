import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './pages/About';
import Header from './components/Header';
import AddEdit from './pages/AddEdit ';
import "./App.css";
import Home from './pages/Home';
import View from './pages/View';

function App() {
    return (
        <BrowserRouter>
        <div className='App'>
            
            <Header />
            <ToastContainer position='top-center' />
            <Routes>
                <Route exact path="/" element={Home} />
                <Route exact path="/add" element={AddEdit} />
                <Route exact path="/update/:id" element={AddEdit} />
                <Route exact path="/view/:id" element={View} />
                <Route exact path="/about" element={About} />
            </Routes>
        </div>
        </BrowserRouter>
    );
};

export default App;