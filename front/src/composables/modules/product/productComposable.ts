import { useToast } from "primevue/usetoast";
import { reactive, ref } from "vue";
import { useApi } from "../../core/useApi";

export function  useProduct() {

    const toast = useToast();
    const products= ref<any[]>([]);

    const {saveData, getData} = useApi();
    const formProduct= reactive({
        nameProduct: '',
        enableFor:{
            sale: false,
            pos: false,
            purchase: false,
            others: false
        },
        typeproduct:"goods",
        billingPolicy:null,
        categoryId: 0,
        trackInventory: false,
        barcode: '',
        salePrice: 0,
        taxsale: 0,
        costPrice: 0,
        taxpurchase: 0
        

    });
    const readproduct =ref(false);

    function fnCreateProduct() {
        if (valideProduc()){
            saveData('/product',formProduct).then((res:any)=>{
                if(res.status==200){
                    toast.add({ severity: 'success'  , summary: 'Success', detail: 'Producto creado con éxito', life: 3050 });   
                }else{
                    toast.add({ severity: 'error'  , summary: 'Error', detail: res.message, life: 3050 });   
                }
            })
            
        }else{
            toast.add({ severity: 'error'  , summary: 'Error', detail: 'Complete los campos requeridos', life: 3050 });   
        }
        
    }

    function fnGetProducts(){
        getData('products',{}).then((res:any)=>{
            if(res.status==200){
                products.value=res.data;
            }
        })
    }

    function valideProduc(){
        if(formProduct.nameProduct.trim().length>0){
            return true
        }

    
        return false

    }

    return {
        formProduct,
        readproduct,
        fnCreateProduct,
        fnGetProducts,
        products
    };
}