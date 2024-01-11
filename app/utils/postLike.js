import getHeaderWithProjectId from "./headerWithProjectId"
import axios from 'axios'

export default async function postLike(id, setLikeCountState){
    const config = getHeaderWithProjectId();
    const token = localStorage.getItem("userToken-amazon-music")
    try {
        const response = await axios.post(
            `https://academics.newtonschool.co/api/v1/linkedin/like/${id}`, 
            {
                headers:{
                    ...config.headers,
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        console.log(response);
        setLikeCountState(prev=>prev+1)
    } catch (error) {
        console.log(id);
        console.log(error);
        
    }
}