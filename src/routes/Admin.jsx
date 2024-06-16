import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import blogFetch from "../axios/config";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts");
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.error("Erro ao obter posts:", error);
    }
  };

  const deletePost = async () => {
    if (postIdToDelete === null) return;

    try {
      await blogFetch.delete(`/posts/${postIdToDelete}`);
      const filteredPosts = posts.filter((post) => post.id !== postIdToDelete);
      setPosts(filteredPosts);
      toast.success("Post excluído com sucesso!");
      setPostIdToDelete(null); // Reset postIdToDelete after deletion
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      toast.error("Erro ao excluir o post. Tente novamente.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="admin px-5 ms-5">
      <h1 className="text-center mb-5">Gerenciar Posts</h1>
      {posts.length === 0 ? (
        <Loading />
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <div className="actions d-flex gap-3">
              <Link
                className="d-flex align-items-center justify-content-center"
                to={`/posts/edit/${post.id}`}
              >
                Editar
              </Link>
              <button
                className="btn btn-outline-danger"
                data-bs-toggle="modal"
                data-bs-target="#confirmDeleteModal"
                onClick={() => setPostIdToDelete(post.id)}
              >
                <i className="bi bi-trash me-1"></i>Excluir
              </button>
            </div>
          </div>
        ))
      )}

      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex="-1"
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <h5
                className="modal-title fw-semibold"
                id="confirmDeleteModalLabel"
              >
                Confirmar exclusão
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja excluir este post?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deletePost}
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
