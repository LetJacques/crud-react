import blogFetch from "../axios/config";

import Loading from "../components/Loading";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});

  const [loading, setLoading] = useState(true);

  const getPost = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);

      const data = response.data;

      setPost(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <div className="post-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="post">
          <h3 className="text-center text-uppercase fw-semibold">
            {post.title}
          </h3>
          <p className="text-center">{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
