import styles from './Login.module.css'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/userAuthentication';
const Login = () => {
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const {login, error: authError, loading} = useAuthentication(); 
  const [error, setError] = useState('');

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setError('')
    const user={
        email,
        password
    }

    const response = await login(user)
   
  
  }

  useEffect(()=>{
    if(authError) setError(authError)
  }, [authError])

  return (
    <div>
        <h2>Entrar</h2>
        <p>Comece a compartilhar sua história</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>E-mail</span>
                <input type="email"
                name='email' 
                required
                placeholder='E-mail do usuário'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password"
                name='password'
                required
                placeholder='Insira sua senha' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            </label>
           

            <button className='btn' type='submit'>Entrar</button>
            {error && <p className='error'> {error} </p>}
        </form>
    </div>
  )
}

export default Login