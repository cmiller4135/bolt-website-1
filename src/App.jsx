import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthProvider from './components/Auth/AuthProvider';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Sub1 from './pages/Sub1';
import Sub2 from './pages/Sub2';
import Sub3 from './pages/Sub3';
import WeatherWidget from './components/WeatherWidget/WeatherWidget';
import SaasTest2 from './pages/SaasTest2';
import SaasTest3 from './pages/SaasTest3';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/submenu1" element={<Sub1 />} />
                <Route path="/submenu2" element={<Sub2 />} />
                <Route path="/submenu3" element={<Sub3 />} />
                <Route path="/saas-test1" element={<WeatherWidget />} />
                <Route path="/saas-test2" element={<SaasTest2 />} />
                <Route path="/saas-test3" element={<SaasTest3 />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;