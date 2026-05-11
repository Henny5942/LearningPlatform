import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Nav from './pages/Nav';
import Layout from './pages/Layout';
import AddUser from './users/AddUser';
import AllCategories from './categories/AllCategories';
import { AuthProvider } from './context/AuthContext';
import Response from './prompts/Response';
import AddPrompt from './prompts/AddPrompt';


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
            <Route path='lessons' element={<p>Lessons page</p>}/>
            <Route path='users' element={<p>Users page</p>}/>
            <Route path='response/:id' element={<Response />}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </div>);
}

export default App;
