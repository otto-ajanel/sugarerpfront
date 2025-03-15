import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const authStore = defineStore('auth', ()=>{
    const apiUrl = import.meta.env.VITE_API_URL

    const token = ref('')
    const isAuth =ref(false)
    
    async function login(email:String, password:String, toast:any){
        

        console.log(email)
        const res = await axios.post<any>(`${apiUrl}/login`,{
            email:email,
            password:password

        })
        console.log(res)
        toast.add({ severity: 'error', summary: 'Ingrese las crendenciales', detail: 'El correo / la contraseña no es correcta', life: 3000 });

    }

    return {
        token, 
        isAuth,
        login
    }
})