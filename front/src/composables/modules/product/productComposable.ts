import { useToast } from "primevue/usetoast";
import { reactive, ref } from "vue";
import { useApi } from "../../core/useApi";

export function  useProduct() {

    const toast = useToast();
    const products= ref<any[]>([]);

    const {saveData, getData} = useApi();
    let  files = reactive<({})>({});
    const formProduct= reactive({
        nameProduct: '',
        enableFor:{
            sale: false,
            pos: false,
            purchase: false,
            others: false
        },
        typeproduct:0,
        billingPolicy:null,
        categoryId: 0,
        trackInventory: false,
        barcode: '',
        salePrice: 0,
        taxsale: 0,
        costPrice: 0,
        taxpurchase: 0,
        atribute_variants: null as any[] | null 

    });
    const readproduct =ref(false);

    function fnCreateProduct() {
        let product:any
        if (valideProduc()){
            formProduct.atribute_variants= formProduct.atribute_variants!=null ? formProduct.atribute_variants.map((i)=>{
                console.log(i);
                return {atribute:i.atribute.value, active:i.active, atribute2:i.atribute2.value}
            
                })  : null;

            saveData('product',formProduct).then((res:any)=>{
                if(res.status==200){
                    product=res.data;
                    toast.add({ severity: 'success'  , summary: 'Success', detail: 'Producto creado con éxito', life: 3050 });   
                }else{
                    toast.add({ severity: 'error'  , summary: 'Error', detail: res.message, life: 3050 });   
                }
            })
         saveFiles(product)
            
        }else{
            toast.add({ severity: 'error'  , summary: 'Error', detail: 'Complete los campos requeridos', life: 3050 });   
        }
        
    }

    async function saveFiles(product:any){
        console.log(files)
        

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

    function setFilesForm(FormFiles:any){
        files = FormFiles;
    }
    function setAtributeVariants(variants:any){
        formProduct.atribute_variants=variants;
    }

    return {
        formProduct,
        readproduct,
        fnCreateProduct,
        fnGetProducts,
        products,
        setFilesForm,
        setAtributeVariants
    };
}