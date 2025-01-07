import styles from './CreatePost.module.css'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContex'


const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState([]);
    const [formErro, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return <div>
        <h1>Criar um novo post</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Título</span>
                <input
                    type='text'
                    name='title'
                    placeholder='Crie um título para o seu post...'
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </label>
            <label>
                <span>URL da imagem</span>
                <input
                    type='text'
                    name='image'
                    placeholder='Insina uma imagem em seu post...'
                    required
                    onChange={(e)=>setImage(e.target.value)}
                    value={image}
                />
            </label>
            <label>
                <span>Conteúdo</span>
                <textarea
                    type='text'
                    name='body'
                    placeholder='Insira o conteúdo do post...'
                    required
                    onChange={(e)=>setBody(e.target.value)}
                    value={body}
                ></textarea>
            </label>
            <label>
                <span>Tags</span>
                <textarea
                    type='text'
                    name='tags'
                    placeholder='Insira as tags separadas por vírgula'
                    required
                    onChange={(e)=>setTags(e.target.value)}
                    value={tags}
                ></textarea>
            </label>
            <button className='btn'>Postar</button>
        </form>
    </div>
}

export default CreatePost