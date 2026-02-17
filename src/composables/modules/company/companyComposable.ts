import { onMounted, ref } from "vue";
import { useApi } from "../../core/useApi";

export default function useCompanyComposable() {
    const companies = ref([]);

    const {getData}= useApi()
    async function getCompanies() {

        const {data}= await getData('companies',{})
        companies.value = data;

    } 
    onMounted(() => {
        getCompanies();
    })

    return {
        companies
    }
}
