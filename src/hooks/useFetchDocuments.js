import { collection, onSnapshot, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"

export const useFetchDocuments = (docCollection, search = null, uid=null)=>{
    const [ documents, setDocuments] = useState('')
    const [ erros, setErros] = useState('')
    const [ loading, setLoading] = useState('')

    const [ cancelled, setCancelled] = useState(false)

    useEffect(()=>{
        async function loadData(){
            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {

                let q;
                if(search){
                    q = await query(
                        collectionRef, 
                        where("tags", "array-contains", search),
                        orderBy("createdAt", "desc")
                    )
                }else if(uid){
                    
                    q = await query(
                        collectionRef, 
                        where("uid", "==", uid), 
                        orderBy("createdAt", "desc"))
                }
                else
                {
                    q = await query(collectionRef, orderBy('createdAt', 'desc'))
                }

                await onSnapshot(q, (QuerySnapshot)=>{
                    setDocuments(QuerySnapshot.docs.map((doc)=>({
                        id:doc.id,
                        ...doc.data(),
                    })))
                })
                
            } catch (error) {
                console.log(error)
                setErros(error.message)
            }
            setLoading(false)

        }
        loadData()
    },[docCollection, documents, cancelled, search, uid])

    useEffect(()=>{
        return ()=>setCancelled(true)
    }, [])
    return {documents, loading, erros};
}