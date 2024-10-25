import { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useAuthentication } from '../../hooks/userAuthentication';

const Register = () => {
    const [ displayName, setDisplayName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const {createUser, error: authError, loading} = useAuthentication(); 
   
   
    const handleSubmit = async(e)=>{
        e.preventDefault()

        setError('')

        if(password !== confirmPassword){
            setError('As senhas precisam ser iguais!')
            return
        }

                
        const user={
            displayName,
            email,
            password
        }

        const response = await createUser(user)
       
      
    }

    useEffect(()=>{
        if(authError) setError(authError)
    }, [authError])

  return (
    <div>
        <h2>Cadastre-se e comece a postar</h2>
        <p>Após o cadastro você estará pronto para compartilhar sua história</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input type="text" 
                name='displayName'
                required
                placeholder='Nome do usuário'
                value={displayName}
                onChange={(e)=>setDisplayName(e.target.value)}/>
            </label>
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
            <label>
                <span>Confirmação de senha:</span>
                <input type="password"
                name='confirmPassword'
                required
                placeholder='Confirme sua senha' 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </label>

            <button className='btn' type='submit'>Cadastrar</button>
            {error && <p className='error'> {error} </p>}
        </form>
    </div>
  )
}

export default Register