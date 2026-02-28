import { reactive, ref } from "vue"
import { useApi } from "../../core/useApi"
import { useRouter } from "vue-router"
export default function userComposable(toast: any) {
    const router = useRouter()
    let formUser = reactive({
        user_id: 0,
        email: '',
        name: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
        phone: '',
        store: null,
        typeUser: null
    })
    const { saveData, editData } = useApi()

    const valideFormUser = () => {

        let valide = false
        if (
            formUser.email.toString().length > 1
            && formUser.name.toString().length > 1
            && formUser.lastName.toString().length > 1
            && formUser.store != null
            && formUser.typeUser != null

        ) {
            valide = true
        }
        return valide
    }
    const saveUser = async () => {

        if (valideFormUser()) {
            const { data } = await saveData('user', formUser)
            if (data) {
                toast.add({ severity: 'success', summary: 'Usuario ', detail: 'Creado', life: 3000 });
                formUser = {
                    user_id: 0,
                    email: '',
                    name: '',
                    lastName: '',
                    password: '',
                    passwordConfirm: '',
                    phone: '',
                    store: null,
                    typeUser: null
                }

                router.push({ name: 'permissions' })
            }

        } else {
            toast.add({ severity: 'warn', summary: 'Usuario ', detail: 'Debe llenar los campos', life: 3000 });

        }

    }
    const changeStateUser = async (infoUser: any) => {

        const { data } = await editData("changestatususer/" + infoUser.id_user, { active: !infoUser.active })
        if (data) {
            toast.add({ severity: 'success', summary: 'Usuario ', detail: 'Cambio de estado del usuario ' + infoUser.email, life: 3000 });

        }
    }
    const updateUser = async () => {

        const { data } = await editData("user" ,formUser)
        if (data) {
            toast.add({ severity: 'success', summary: 'Usuario ', detail: 'Cambios guardados ' , life: 3000 });
        formUser.user_id =0
        formUser.name=""
        formUser.lastName = ""
        formUser.email=""
        formUser.typeUser = null
        formUser.store = null
        formUser.password = ''
        formUser.passwordConfirm = ''
        formUser.phone = ''

        }

    }
    const setFormToUpdate = (userDato: any) => {
        formUser.user_id = userDato.user_id
        formUser.name = userDato.name
        formUser.lastName = userDato.Lastname
        formUser.email = userDato.email
        formUser.typeUser = null
        formUser.store = null
        formUser.password = ''
        formUser.passwordConfirm = ''
        formUser.phone = ''

    }

    return {
        formUser,
        saveUser,
        changeStateUser,
        updateUser,
        setFormToUpdate
    }
}
