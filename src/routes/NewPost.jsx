import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import blogFetch from "../axios/config";
import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError("Adicione um título.");
      return;
    } else {
      setTitleError("");
    }

    if (!body.trim()) {
      setBodyError("Adicione o conteúdo.");
      return;
    } else {
      setBodyError("");
    }

    const post = { title, body, userId: 1 };

    try {
      const response = await blogFetch.post("/posts", post);

      if (response.status === 201) {
        toast.success("Post criado com sucesso!");
        navigate("/");
      } else {
        toast.error("Erro ao criar o post. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      toast.error("Erro ao criar o post. Tente novamente.");
    }
  };

  return (
    <div className="new-post d-flex flex-column align-items-center">
      <h3 className="text-center mb-3">Criar novo post</h3>
      <hr />
      <form onSubmit={createPost} className="form-container w-100">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            className="form-control mb-0"
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <small className="text-danger">{titleError}</small>}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            className="form-control mb-0"
            name="body"
            id="body"
            rows="6"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          {bodyError && <small className="text-danger">{bodyError}</small>}
        </div>
        <div>
          <input className="button mt-3" type="submit" value="Publicar" />
        </div>
      </form>
    </div>
  );
};

export default NewPost;
