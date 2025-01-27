import styles from "../CreatePost/CreatePost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContex";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {

  const {id} = useParams();
  const {document: post} = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts")

  const navigate = useNavigate();

    useEffect(()=>{
        if(post){
            console.log(post)
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)
            const tagsText = post.tags.join(", ")
            setTags(tagsText)
        }
        
    }, [post])
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }
    if(formError) return
    
    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data);


    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.create_post}>
      <h2>Editar post</h2>

      {post && <>
        <form onSubmit={handleSubmit}>
            <label>
            <span>Título:</span>
            <input
                type="text"
                name="text"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            </label>
            <label>
            <span>URL da imagem:</span>
            <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
            />
            </label>
            <label>
            <span>Conteúdo:</span>
            <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
            ></textarea>
            </label>
            <label>
            <span>Tags:</span>
            <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
            />
            </label>
            {!response.loading && <button className="btn">Editar post!</button>}
            {response.loading && (
            <button className="btn" disabled>
                Aguarde.. .
            </button>
            )}
            {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
            )}
        </form>
      </>}
      
    </div>
  );
};

export default EditPost;