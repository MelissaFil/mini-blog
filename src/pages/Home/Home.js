import { useState } from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';
const Home = () => {
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments("posts")
  return (
    <div>
        <h1>Home</h1>
        <div>
          <input placeholder='Procure por tags' onChange={(e)=>setQuery(e.target.value)}/>
        </div>
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