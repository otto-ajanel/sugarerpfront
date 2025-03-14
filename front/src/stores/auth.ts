import { defineStore } from "pinia";
import { ref } from "vue";

export const authStore = defineStore('auth', ()=>{
    const token = ref('')
    const isAuth =ref(false)
    
    function login(email:String, password:String, toast:any){
        console.log("login")
        toast.add({ severity: 'error', summary: 'Ingrese las crendenciales', detail: 'El correo / la contraseña no es correcta', life: 3000 });

    }

    return {
        token, 
        isAuth,
        login
    }
})