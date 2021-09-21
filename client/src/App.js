import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx'
import AuthPage from './pages/Authpage/AuthPage';

function App() {
  return (
    <div className="app">
      <Navbar/>
      <AuthPage/>
    </div>
  );
}

export default App;
