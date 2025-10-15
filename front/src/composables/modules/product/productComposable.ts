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
        typeproduct:{
            goods: false,
            combos: false,
            service: false
        },
        billingPolicy: {
            type: 'fixed',
            value: 0
        },
        categoryId: 0,

    });
    const readproduct =ref(false);

    return {
        formProduct,
        readproduct
    };
}