import { useEffect, useState } from "react"


export const useLoading = (callback : () => any) : any[] => {
    const [fetch_loading,setLoading] = useState<boolean>(false)
    const [fetch_error,setError] = useState<string>('')
    const FetchData = async() => {
        try{
            setLoading(true)
            await callback()
            
        }
        catch(e){
            let message = 'Unknown error'
            if (e instanceof Error) message = e.message
            setError(message)
        }
        finally{
            setLoading(false)
        }
    }
    return[
        FetchData,fetch_error,fetch_loading
    ]
}
