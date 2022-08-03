
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Main from './pages/Main';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/My_channel' element={<ProfilePage/>}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
