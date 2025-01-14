import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument";
import styles from "../../components/PostDetails.module.css"


function Post() {
    const {id} = useParams();
    const {document: post} = useFetchDocument("posts", id)
    return (
        <div className={styles.containerPosts}>

            <img src={post.image} alt={post.title} className={styles.img}></img>
            <div className={styles.descricao}>
                <h2 className={styles.title}>{post.title}</h2>
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
    )
}

export default Post
