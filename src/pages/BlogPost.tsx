import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`/blog/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
      <p className="text-gray-300 mb-4">{post.date}</p>
      <div className="prose text-white" dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
    </div>
  );
};

export default BlogPost;
