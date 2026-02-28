import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL
export function useApi() {
    const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    async function getData(url: String, params: any) {
        const data = await axios.get(apiUrl + "/api/v1/" + url, { headers: header, params });
        return data;
    }
    async function saveData(url: String, body: any) {
        const data = await axios.post(apiUrl + "/api/v1/" + url, body, { headers: header });
        return data;
    }
    async function editData(url:string, body:any){
        const data = await axios.put(apiUrl + "/api/v1/" + url,body, { headers: header })
        return data
    }

        async function saveImage(url: String, body: any) {
            header["Content-Type"]='multipart/form-data'
        const headerMultipart = header;
        const data = await axios.post(apiUrl + "/api/v1/" + url, body, { headers: headerMultipart });
        return data;
    }
     async function getImage(url: String, params: any) {
        header["Accept"]='image/*'
        const data = await axios.get(apiUrl + "/api/v1/" + url, { headers: header, params, responseType: 'blob', });
        return data;
    }

    return {
        getData,
        saveData,
        saveImage,
        getImage,
        editData
    }
}


