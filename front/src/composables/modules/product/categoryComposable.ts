import {  ref } from "vue";
import {useApi} from '../../core/useApi'
export default function useCategory() {
    let categories = ref<any[]>([])
    const showModalCategory=ref(false)
    const {getData, saveData} = useApi()

    async function getAllCategories() {
        const {data} =await getData('categories',{})
        categories.value = data.map((cat:any) => ({
            code: cat.id,
            des_category: cat.des,
            name: cat.des,
        }))

    }
    function setShowModalCategory(value:boolean){
        showModalCategory.value=value
    }

    async function fnCreateCategory(newCategory:any){
        const {data} =await saveData('createcategory',{newCategory})
        console.log(data)
    }

    return { categories 
        , getAllCategories 
        , showModalCategory 
        , setShowModalCategory 
        , fnCreateCategory
    }
}