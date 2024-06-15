import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import "./Home.css";
import blogFetch from "../axios/config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // página atual
  const postsPerPage = 10; // número de posts por página

  // Função para buscar os posts da API
  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts");
      const data = response.data;

      const imageUrls = [
        "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/14354107/pexels-photo-14354107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/9242836/pexels-photo-9242836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7742832/pexels-photo-7742832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/6153738/pexels-photo-6153738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ];

      const updatedData = data.map((post, index) => ({
        ...post,
        imageUrl: imageUrls[index % imageUrls.length],
      }));

      setPosts(updatedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home container">
      <h1 className="mb-5 home-title">Últimas notícias</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          {currentPosts.map((post) => (
            <div className="post card mb-4" key={post.id}>
              <div className="row g-0 w-100">
                {post.imageUrl && (
                  <div className="col-md-3">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="img-fluid rounded-start post-image"
                    />
                  </div>
                )}
                <div className="col-md-8">
                  <div className="card-body ps-5">
                    <h3 className="card-title fw-semibold">{post.title}</h3>
                    <p className="card-text">{post.body}</p>
                    <Link
                      to={`/posts/${post.id}`}
                      className="button d-flex align-items-center justify-content-center gap-2"
                    >
                      Ler mais
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Paginação */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`page-button me-2 ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
