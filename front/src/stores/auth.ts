import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const authStore = defineStore('auth', ()=>{
    const apiUrl = import.meta.env.VITE_API_URL

    const token = ref('')
    const isAuth =ref(false)
    
    async function login(email:String, password:String, toast:any){

        try {

            let res =await axios.post<any>(`${apiUrl}/login`,{
                email:email,
                password:password
                
            })
            isAuth.value=true
        } catch (error:any) {
            
            if (error.response && error.response.status ==404) {
                toast.add({ severity: 'error', summary: 'Ingrese las crendenciales', detail: 'El correo / la contraseña no es correcta', life: 3000 });
            } 
            
        }
    }

    return {
        token, 
        isAuth,
        login
    }
})