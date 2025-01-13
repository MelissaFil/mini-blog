import { useState } from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';
const Home = () => {
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments("posts")
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className='container'>
        <h1>Home</h1>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input placeholder='Procure por tags' onChange={(e)=>setQuery(e.target.value)}/>

        </form>
        {posts.length>0 && 
          <div className='posts'>
            {loading && <p>Carregando...</p>}
            {posts.map((post) => (
              <PostDetails post={post} />
            ))}

          </div>
        }
        {posts.length===0 && 
          <div>
            <p>Ainda não encontramos posts para você</p>
            <Link className='btn' to='/posts/create'>Criar post</Link>
          </div>
        }
        
    </div>
  )
}

export default Home