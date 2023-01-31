import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'firebase/firestore';
import 'firebase/auth';
import {Provider} from 'react-redux'
import { SetupStore } from './store/store';
import {GoogleAuthProvider} from 'firebase/auth'
import {BrowserRouter} from 'react-router-dom'
import {getStorage  } from 'firebase/storage'
import {app} from './config'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export const store = SetupStore()
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
