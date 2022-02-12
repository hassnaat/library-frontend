import { useEffect, useState } from 'react'
import axios from "../axiosInstance";

const useFetch = (url) => {
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const fetchData = async () => {
        setLoading(true)
        try {
            let { data } = await axios(url);
            setResponse(data)
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError("something went wrong");
            }
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return { loading, error, response }
}

export default useFetch
