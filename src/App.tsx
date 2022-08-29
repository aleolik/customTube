
import './App.css';
import {Routes,Route, useLocation} from 'react-router-dom'
import Layout from './components/Layout';
import Main from './pages/MainPage/Main';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import VideoPage from './pages/VideoPage/VideoPage';
import { useAppSelector } from './hooks/TypedHooks';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import { useEffect } from 'react';
function App() {
  const location = useLocation()
  const titles = [
    {
      'path':'/',
      'title':'Home'
    },
    {
      'path':'/history',
      'title' : 'Your History'
    }
  ]

  useEffect(() => {
    titles.map((obj) => {
      if (obj.path == location.pathname){
        document.title = obj.title
      }
      else{
        document.title = 'React'
      }
    })
  },[location.pathname])
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}></Route>
           <Route path='user/:username/:email' element={<ProfilePage/>}></Route>
           <Route path=':videoname/:username' element={<VideoPage/>}></Route>
           <Route element={<ProtectedRoute/>}>
              <Route path='/history' element={<HistoryPage/>}></Route>
           </Route>
           <Route path='*' element={<NotFoundPage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
