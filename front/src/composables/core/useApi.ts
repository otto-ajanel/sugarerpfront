import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL 
export  function useApi(){
    const header ={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    async function getData(url:String, params:any){
        const data = await axios.get(apiUrl+"/api/v1/"+url, { headers: header, params});
        return data;
    }
        async function saveData(url:String, body:any){
            const data = await axios.post(apiUrl+"/api/v1/"+url, body, { headers: header});
            return data;
        }
    return{
        getData,
        saveData
    }
}


