    // src/components/PostList.js
    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import './PostList.css';
    import { Link } from 'react-router-dom';

    const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${(currentPage - 1) * 10}&_limit=10`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        };

        fetchPosts();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="post-list-container">
            <button style={{marginTop:"10px"}} >
            <Link style={{color:"white"}} to="/create" >Create Post</Link>
            </button>
        <h1>Post List</h1>
        <ul className="post-cards">
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            {/* Update the Link component for each post */}
            <Link to={`/post/${post.id}`}>
              <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </Link>
          </li>
        ))}
        </ul>
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
        </div>
        </div>
    );
    };

    export default PostList;
