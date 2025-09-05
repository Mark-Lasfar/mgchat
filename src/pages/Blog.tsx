import React, { useState, useEffect } from 'react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/blog?skip=0&limit=10')
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
      <div className="w-full max-w-md">
        {posts.map((post) => (
          <div key={post.id} className="mb-4">
            <a href={`/blog/${post.id}`} className="text-blue-300">{post.title}</a>
            <p className="text-gray-300">{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
