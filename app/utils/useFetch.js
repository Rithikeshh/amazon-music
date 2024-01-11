import getHeaderWithProjectId from "./headerWithProjectId"
import axios from 'axios'
const { useEffect } = require("react")
const { useState } = require("react")

const useFetch = (option, filterName, filterValue, page)=>{
    const [loading, setLoading] = useState(true)
    const [musicList, setMusicList] = useState([])
    const [error, setError] = useState(null)
    const url = `https://academics.newtonschool.co/api/v1/music/song?filter={"${filterName}":"${filterValue}"}&limit=20&page=${page}`
    
    useEffect(()=>{
        async function fetchData(){
            const config = getHeaderWithProjectId();
            try {
                const response = await axios[option](url, config)
                setMusicList(response.data.data)
            } catch (error) {
                console.log(error);
                setError(error)
            }
            finally{
                setTimeout(()=>{
                    setLoading(false)
                },400)
            }
        }
        fetchData()
        return ()=>{
            setLoading(true)
        }
    },[page])
    return {loading, musicList, error}
}

export default useFetch;