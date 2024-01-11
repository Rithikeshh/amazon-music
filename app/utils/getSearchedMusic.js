import getHeaderWithProjectId from "./headerWithProjectId"
import axios from 'axios'

export default async function getSearchedMusic(searchedMusic, setSearchedMusic){

    const config = getHeaderWithProjectId();
    try {
        const response = await axios.get(
            `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchedMusic}"}`, 
            config
        )
        setSearchedMusic(response.data.data)
    } catch (error) {
        console.log(error);
        
    }
    // finally{
    //     setTimeout(()=>{
    //         setLoading(false)
    //     },400)
    // }
}