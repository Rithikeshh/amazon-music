import getHeaderWithProjectId from "./headerWithProjectId"
import axios from 'axios'

export default async function getComment(id, setCommentList){
    const config = getHeaderWithProjectId();
    const token = localStorage.getItem("userToken-amazon-music")
    try {
        const response = await axios.get(
            `https://academics.newtonschool.co/api/v1/linkedin/post/${id}/comments`, 
            {
                headers:{
                    ...config.headers,
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        console.log(response);
        setCommentList(response.data.data)
    } catch (error) {
        console.log(id);
        console.log(error);
        
    }
}