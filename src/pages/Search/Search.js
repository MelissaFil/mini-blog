import React from 'react'
import UseQuery from '../../hooks/useQuery'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';
import { Link } from 'react-router-dom';

function Search() {
    const query = UseQuery();
    const search = query.get("q");
    const { documents: posts, loading } = useFetchDocuments("posts", search)

    return (
        <div>
            <h1>Resultados: </h1>
            {posts.length > 0 &&
                <div className='posts'>
                    {loading && <p>Carregando...</p>}
                    {posts.map((post) => (
                        <PostDetails post={post} />
                    ))}

                </div>
            }
            {posts.length === 0 &&
                <div>
                    <p>Ainda não encontramos um post para sua pesquisa.</p>
                    <Link className='btn' to='/posts/create'>Crie esse post você mesmo</Link>
                </div>
            }

        </div>

    )
}

export default Search
