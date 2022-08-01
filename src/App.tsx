import React from 'react';
import './App.css';
import Header from './components/Header'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout/>}>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
