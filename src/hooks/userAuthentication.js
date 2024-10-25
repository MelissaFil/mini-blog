import{db} from "../firebase/config"

import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"

import { useEffect, useState } from "react"

export const useAuthentication = ()=>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    const createUser = async (data)=>{
        checkIfIsCancelled()

        setLoading(true)
        
        
        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile( user, {displayName: data.displayName})

            return user

        } catch(error){

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
              } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
              } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
              }

              setLoading(false)
              setError(systemErrorMessage);
        
        }

        setLoading(false)
    }

    useEffect(()=>{
        return ()=> setCancelled(true)
    }, [])

    return{
        auth,
        createUser,
        error,
        loading
    }
}