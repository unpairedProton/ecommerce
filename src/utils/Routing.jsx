import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Details2 from '../components/Details2'
import Home from '../components/Home'
import Create from '../components/Create'
import Edit2 from '../components/Edit2'

function Routing() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />

        <Route path="/details/:id" element={<Details2 />} />
        <Route path="/edit/:id" element={<Edit2 />} />
    </Routes>
  ) 
}

export default Routing