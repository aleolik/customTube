import { useEffect, useState } from "react"


export const useLoading = () => {

    const useFetchData = async(callback : () => Promise<any[]>) => {
        const [fetch_loading,setLoading] = useState<boolean>(false)
        const [fetch_error,setError] = useState<string>('')
        const [fetch_data,setFetch] = useState<any[]>([])

        const FetchData = async() => {
            const data = await callback()
            console.log(data)
            setFetch(data)
        }
        useEffect(() => {
            setLoading(true)
            try{
                FetchData()
            }
            catch(e){
                let message = 'Unknown error'
                if (e instanceof Error) message = e.message
                setError(message)
            }
            finally{
                setLoading(false)
            }
        },[])

        return[
            fetch_loading,fetch_error,fetch_data
        ]
        }
    return(
        useFetchData
    )   
}
