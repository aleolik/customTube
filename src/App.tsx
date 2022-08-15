
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Main from './pages/MainPage/Main';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import VideoPage from './pages/VideoPage/VideoPage';
import { useAppSelector } from './hooks/TypedHooks';
function App() {
  const showModal = useAppSelector(state => state.modal.show_login_or_faq)
  return (
    <div  className="app">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}></Route>
           <Route path='user/:username' element={<ProfilePage/>}></Route>
           <Route path=':videoname/:username' element={<VideoPage/>}></Route>
           <Route path='*' element={<NotFoundPage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
