import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import AddUser from './pages/AddUser';
import AllCategories from './components/categories/AllCategories';
import { AuthProvider } from './context/AuthContext';
import Response from './pages/Response';
import AddPrompt from './pages/AddPrompt';
import History from './pages/History';


function App() {
  return (<div>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />}/>
            <Route path='addUser' element={<AddUser />}/>
            <Route path='categories' element={<AllCategories />}/>
            <Route path="/create-prompt" element={<AddPrompt />} />
            <Route path='users' element={<p>Users page</p>}/>
            <Route path='history' element={<History />}/>
            <Route path='response/:id' element={<Response />}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </div>);
}

export default App;
