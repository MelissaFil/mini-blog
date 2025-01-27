import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PostDetails.module.css'

function PostDetails({post}) {
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
            </div>
                
            <Link className='btn btn-outline' to={`/posts/${post.id}`}>Ler mais</Link>
        </div>
    )
}

export default PostDetails
