import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'


function App() {
  const { login, logout, token, userId, isReady } = useAuth();
  const isLogin = !!token; // оператор !! приводит к булевому значению
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
