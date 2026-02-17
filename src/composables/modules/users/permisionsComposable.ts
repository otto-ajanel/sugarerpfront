import { ref } from "vue"

import {useApi} from '../../core/useApi'
export default function permisionsState(){
    
    const {getData} = useApi()
    const users =ref({data:[], total:0})
    async function getUsers(page:number){
            const params:any = {
                page
            }
        const {data} = await getData('user',params )
        users.value= data
    }

    return {
        getUsers, 
        users
    }
}