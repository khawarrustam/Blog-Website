import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BlogList from './pages/BlogList';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;