import styles from './Register.module.css'

const Register = () => {
  return (
    <div>
        <h2>Cadastre-se e comece a postar</h2>
        <p>Após o cadastro você estará pronto para compartilhar sua história</p>
        <form>
            <label>
                <span>Nome:</span>
                <input type="text" 
                name='displayName'
                required
                placeholder='Nome do usuário'/>
            </label>
            <label>
                <span>E-mail</span>
                <input type="email"
                name='email' 
                required
                placeholder='E-mail do usuário'/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password"
                name='password'
                required
                placeholder='Insira sua senha' />
            </label>
            <label>
                <span>Confirmação de senha:</span>
                <input type="password"
                name='confirmPassword'
                required
                placeholder='Confirme sua senha' />
            </label>
        </form>
    </div>
  )
}

export default Register