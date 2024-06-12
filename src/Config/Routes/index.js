import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { InputData, EditData, Data, ReportsData } from '../../Pages'

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/input-data" element={<InputData />} />
        <Route path="/edit-data/:id" element={<EditData />} /> 
        <Route path="/reports-data" element={<ReportsData />} /> 
        <Route path="/" element={<Data />} />
      </Routes>
    </Router>
  );
}

export default Index;
