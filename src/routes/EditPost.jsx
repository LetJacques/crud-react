import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import blogFetch from "../axios/config";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const getPost = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);
      const data = response.data;
      setTitle(data.title);
      setBody(data.body);
    } catch (error) {
      console.error("Erro ao buscar o post:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    const post = { title, body, userId: 1 };

    try {
      await blogFetch.put(`/posts/${id}`, {
        body: post,
      });
      toast.success("Post atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao editar o post:", error);
      toast.error("Erro ao editar o post. Tente novamente.");
    }
  };

  return (
    <div className="new-post d-flex flex-column align-items-center">
      <h2 className="text-center mb-3">Editando: {title}</h2>
      <form onSubmit={editPost} className="form-container w-100">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            className="form-control"
            name="body"
            id="body"
            rows="6"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          ></textarea>
        </div>
        <div>
          <input className="button mt-3" type="submit" value="Editar post" />
        </div>
      </form>
    </div>
  );
};

export default EditPost;
