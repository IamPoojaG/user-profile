import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/Registraion';
import RegistrationEdit from './components/RegistraionEdit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from './components/Table';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route Exact path='/' element={<Registration />}></Route>
          <Route Exact path='/:id' element={<RegistrationEdit />} />
          <Route Exact path='/table' element={<Table />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
