import { useAuthValue } from '../../context/AuthContex'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import styles from "../../components/PostDetails.module.css"
import { Link } from 'react-router-dom';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = ()=>{
    const {user} = useAuthValue();
    const uid = user.uid;
    const {documents: posts, loading} = useFetchDocuments("posts", null, uid);
    const {deleteDocument} = useDeleteDocument("posts", null, uid);

    return (
    <div>
        <h2>Seu perfil</h2>
         {posts.length===0 && 
                  <div>
                    <p>Não encontramos seus posts, você pode começar agora.</p>
                    <Link className='btn' to='/posts/create'>Criar post</Link>
                  </div>
        }
        {posts && posts.map((post)=>(
            
                <div className={styles.containerPosts}>

                <img src={post.image} alt={post.title} className={styles.img}></img>
                
                <div className={styles.descricao}>
                    <div className={styles.tituloDashboard}>
                        <h2 className={styles.title}>{post.title}</h2>
                        <Link to={`/posts/edit/${post.id}`}>Editar</Link>
                        <button onClick={()=> deleteDocument(post.id)}>Deletar</button>
                    </div>
                    <p className={styles.createdBy}>{post.createdBy}</p>
                    <div className={styles.tags}>
                        {post.tags.map((tag)=>(
                            <p key={tag}>
                                <span>#</span>
                                {tag} 
                            </p>
                        ))}
                    </div>
                    <p>{post.body}</p>

                </div>
            </div>
             
        ))}
    </div>)
}

export default Dashboard