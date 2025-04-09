import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Details2 from '../components/Details2'
import Home from '../components/Home'
import Create from '../components/Create'
import Edit from '../components/Edit'

function Routing() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />

        <Route path="/details/:id" element={<Details2 />} />
        <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  ) 
}

export default Routing