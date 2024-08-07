import './App.css';
import CreatePost from './Create/CreatePost';
import PostDetail from './Posts/PostDetail';
import PostList from './Posts/PostList';
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/' element={<PostList/>}/>
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
      
      
      </Router>
    </div>
  );
}

export default App;
