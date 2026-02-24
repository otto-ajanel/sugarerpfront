import { ref } from "vue"
import { useApi } from "../../core/useApi"
export default function userComposable(toast:any){

    const formUser= ref({
        email:'',
        name:'',
        lastName:'',
        password:'',
        passwordConfirm:'',
        phone:'',
        store:null

    })
    const {saveData} =useApi()

const valideFormUser=async()=>{
    let valide =false
    if(
        formUser.value.email.length>5
        && formUser.value.name.length>4
        && formUser.value.lastName.length>4
        && formUser.value.phone.length>4
        && formUser.value.store!=null

    )valide=true

    return valide
    }
    const saveUser=async()=>{

        if(await valideFormUser()){
            const {data} = await saveData('users',formUser)
            if(data){
            toast.add({ severity: 'success', summary: 'Usuario ', detail: 'Creado', life: 3000 });
            formUser.value={
                email:'',
                name:'',
                lastName:'',
                password:'',
                passwordConfirm:'',
                phone:'',
                store:null
            }

            }
        }else{
          toast.add({ severity: 'warn', summary: 'Usuario ', detail: 'Debe llenar los campos', life: 3000 });

        }

    }
    return{
        formUser,
        saveUser
    }
}
