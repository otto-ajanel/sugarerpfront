import { useToast } from "primevue/usetoast";
import { reactive, ref, computed } from "vue";
import { useApi } from "../../core/useApi";

export function useProduct() {

    const toast = useToast();
    const products = ref<any[]>([]);
    
    // Pagination states
    const totalRecords = ref(0);
    const first = ref(1);
    const rows = ref(10);
    const currentPage = ref(1);

    const { saveData, getData, saveImage } = useApi();
    let files = reactive<({})>({});
    const formProduct = reactive({
        nameProduct: '',
        enableFor: {
            sale: false,
            pos: false,
            purchase: false,
            others: false
        },
        typeproduct: 0,
        billingPolicy: null,
        categoryId: 0,
        trackInventory: false,
        barcode: '',
        salePrice: 0,
        taxsale: 0,
        costPrice: 0,
        taxpurchase: 0,
        atribute_variants: null as any[] | null

    });
    const readproduct = ref(false);

    // Computed para total de páginas
    const totalPages = computed(() => {
        return Math.ceil(totalRecords.value / rows.value);
    });

    async function fnCreateProduct() {
        let product: any
        if (valideProduc()) {
            formProduct.atribute_variants = formProduct.atribute_variants != null ? formProduct.atribute_variants.map((i) => {
                console.log(i);
                return { atribute: i.atribute.value, active: i.active, atribute2: i.atribute2.value }

            }) : null;

            await saveData('product', formProduct).then((res: any) => {
                if (res.status == 200) {
                    
                    product = res.data;
                    toast.add({ severity: 'success', summary: 'Success', detail: 'Producto creado con éxito', life: 3050 });
                } else {
                    toast.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3050 });
                }
            })
            saveFiles(product)
            clearFormProduct();

        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos', life: 3050 });
        }

    }
    function clearFormProduct() {
        formProduct.nameProduct = '';
        formProduct.enableFor = {
            sale: false,
            pos: false,
            purchase: false,
            others: false
        };
        formProduct.typeproduct = 0;
        formProduct.billingPolicy = null;
        formProduct.categoryId = 0;
        formProduct.trackInventory = false;
        formProduct.barcode = '';
        formProduct.salePrice = 0;
        formProduct.taxsale = 0;
        formProduct.costPrice = 0;
        formProduct.taxpurchase = 0;
        formProduct.atribute_variants = null;
        files = {}; 

    }

    async function saveFiles(product: any) {
 

        for (let file: any of files) {
            const formData = new FormData();
            formData.append('imageFile', file);
            formData.append('productId', product.product.product_id)
            await saveImage('uploadproductimage', formData).then((res: any) => {
                if (res.status == 200) {
                    toast.add({ severity: 'success', summary: 'Success', detail: 'Imagen subida con éxito', life: 3050 });
                } else {
                    toast.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3050 });
                }
            })
            console.log(file);

        }


    }

    function fnGetProducts() {
        getData('products', {}).then((res: any) => {
            if (res.status == 200) {
                products.value = res.data.products;
                totalRecords.value =res.data.total

            }
        })
    }

    // Pagination event handlers
    const onPageChange = (event: any) => {
        console.log('Evento de página:', {
            page: Math.floor(event.first / event.rows) + 1,
            first: event.first,
            rows: event.rows,
            pageCount: event.pageCount,
            totalRecords: event.totalRecords
        });

        // Actualizar estado
        first.value = event.first;
        rows.value = event.rows;
        currentPage.value = Math.floor(event.first / event.rows) + 1;

        // Llamar a tu API
        fetchPageData(currentPage.value, rows.value);
    };

    const onSortChange = (event: any) => {
        console.log('Sort changed:', event);
        // Implementar lógica de ordenamiento si es necesario
        fetchPageData(currentPage.value, rows.value);
    };

    const onFilterChange = (event: any) => {
        console.log('Filter changed:', event);
        // Implementar lógica de filtrado si es necesario
        currentPage.value = 1;
        first.value = 0;
        fetchPageData(1, rows.value);
    };

    // Fetch data from backend
    const fetchPageData = async (page: number, limit: number) => {
        try {
            // Aquí llamas a tu API con page y limit
            const response = await getData('products', { page, limit });

            if (response.status === 200) {
                products.value = response.data.products || [];
                totalRecords.value = response.data.total || 0;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar productos', life: 3050 });
        }
    };

    // Manual pagination button handlers
    const goToFirstPage = () => {
        console.log('Ir a primera página');
        currentPage.value = 1;
        first.value = 0;
        fetchPageData(1, rows.value);
    };

    const goToLastPage = () => {
        console.log('Ir a última página');
        currentPage.value = totalPages.value;
        first.value = (totalPages.value - 1) * rows.value;
        fetchPageData(totalPages.value, rows.value);
    };

    const goToPrevPage = () => {
        if (currentPage.value > 1) {
            console.log('Ir a página anterior');
            currentPage.value--;
            first.value = (currentPage.value - 1) * rows.value;
            fetchPageData(currentPage.value, rows.value);
        }
    };

    const goToNextPage = () => {
        if (currentPage.value < totalPages.value) {
            console.log('Ir a página siguiente');
            currentPage.value++;
            first.value = (currentPage.value - 1) * rows.value;
            fetchPageData(currentPage.value, rows.value);
        }
    };

    const onRowsChange = (newRows: number) => {
        console.log(`Filas cambiadas a: ${newRows}`);
        rows.value = newRows;
        // Volver a página 1 cuando cambia el número de filas
        currentPage.value = 1;
        first.value = 0;
        fetchPageData(1, newRows);
    };

    function valideProduc() {
        if (formProduct.nameProduct.trim().length > 0) {
            return true
        }

        return false

    }

    function setFilesForm(FormFiles: any) {
        files = FormFiles;
    }
    function setAtributeVariants(variants: any) {
        formProduct.atribute_variants = variants;
    }

    return {
        // Product form and list
        formProduct,
        readproduct,
        fnCreateProduct,
        fnGetProducts,
        products,
        setFilesForm,
        setAtributeVariants,
        
        // Pagination states
        totalRecords,
        first,
        rows,
        currentPage,
        fetchPageData,
        totalPages,
        
        // Pagination event handlers
        onPageChange,
        onSortChange,
        onFilterChange,
        onRowsChange,
        
        // Manual navigation
        goToFirstPage,
        goToLastPage,
        goToPrevPage,
        goToNextPage
    };
}