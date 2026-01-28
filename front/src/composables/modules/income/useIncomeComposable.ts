import { onMounted, reactive, ref } from "vue"
import { useApi } from "../../core/useApi"

export default function useIncomeComposable() {

    const { getData, saveData } = useApi()
    const stores = ref<[]>([])
    const suppliers = ref<[]>([])
    const products = ref<[]>([])
    const incomes  = ref<[]>([])
    const messageSendIncome=reactive({
        open:false,
        message:'',
        type:''
    })

    const formIncome = reactive({
        id: null,
        dateing: '',
        store: null,
        supplier: null,
        document: '',
        details: [] as any[]
    })

    const valideIncomeSend = () => {
        if (formIncome.store && formIncome.supplier && formIncome.details.length > 0) {
            return true
        }
        return false
    }

    async function sendIncome() {
        
        if (valideIncomeSend()) {
            const { data } = await saveData('incomes', formIncome)
            if (data) {
                messageSendIncome.open=true
                messageSendIncome.message='Ingreso guardado con éxito'
                messageSendIncome.type='success'
                formIncome.dateing =''
                formIncome.store = null
                formIncome.supplier=null
                formIncome.document=""
                formIncome.details=[]


            }
        }else{
            messageSendIncome.open=true
            messageSendIncome.message='Por favor complete todos los campos requeridos'
            messageSendIncome.type='error'
            
        }
    }

    const getStores = async () => {
        const { data } = await getData('stores', {})

        stores.value = data.map((store: any) => ({
            name: store.store_name,
            code: store.store_id
        })
        )
    }

    const getSuppliers = async () => {
        const { data } = await getData('suppliers', {})
        suppliers.value = data.map((supplier: any) => ({
            name: supplier.company_name,
            code: supplier.id_supplier
        })
        )
    }
    const getProducts = async () => {
        const { data } = await getData('products', {})
        products.value = data.products.map((product: any) => ({
            label: product.product_sku + " " + product.product_des,
            value: product.product_id
        })
        )
    }

    const getIncomes=async()=>{
        const {data} = await getData('incomes',{})
        incomes.value=data
    }
    const updateDetails = (items: any) => {
        formIncome.details = items;
    }

    onMounted(async() => {
        await Promise.all([
            getStores(),
            getSuppliers(),
            getProducts(),
            getIncomes()
        ])
    })


    return {
        incomes,
        formIncome,
        sendIncome,
        stores,
        suppliers,
        products,
        updateDetails,
        messageSendIncome
    }
}