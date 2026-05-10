import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Nav from './pages/Nav';
import Layout from './pages/Layout';
import AddUser from './users/AddUser';
import AllCategories from './categories/AllCategories';
function App() {
  return (<div>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<h1>home page</h1>}/>
          <Route path='addUser' element={<AddUser />}/>
          <Route path='categories' element={<AllCategories />}/>
          <Route path='lessons' element={<p>Lessons page</p>}/>
          <Route path='users' element={<p>Users page</p>}/>
        </Route>
      </Routes>
    </Router>
  </div>);
}

export default App;
