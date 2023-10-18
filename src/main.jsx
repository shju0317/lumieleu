import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';
import './styles/scrollbar.css';
import MyPage from './pages/MyPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MyPage/>
  </StrictMode>
);
