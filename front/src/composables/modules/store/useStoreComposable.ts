import { onMounted, ref } from "vue"
import { useApi } from "../../core/useApi"

export default function useStoreComposable() {

    const { getData } = useApi()

    const stores = ref([])

    async function getStores() {
        const { data } = await getData('stores', {})
        stores.value = data
    }

    onMounted(() => {
        getStores()
    })
    return {
        stores
    }
}
