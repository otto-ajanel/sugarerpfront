import { reactive, ref } from "vue";

export function  useProduct() {
    const formProduct= reactive({
        nameProduct: '',
        enableFor:{
            sale: false,
            pos: false,
            purchase: false,
            others: false
        },
        typeproduct:"goods",
        billingPolicy: {
            type: 'fixed',
            value: 0
        },
        categoryId: 0,
        trackInventory: false,
        barcode: '',
        salePrice: 0,
        taxsale: 0,
        costPrice: 0,
        taxpurchase: 0
        

    });
    const readproduct =ref(false);

    return {
        formProduct,
        readproduct
    };
}