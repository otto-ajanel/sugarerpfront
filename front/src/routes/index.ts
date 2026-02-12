import { createWebHistory, createRouter } from "vue-router";
import { authStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const routes = [
      {
        path:'/',
        component: ()=>import('../layouts/public.vue'),
        name:'home',

    }, 
     {
    path:'/erp',
    component: ()=>import('../layouts/sugarErp.vue'),
    children: [
        {
            path:'users',
            component: ()=>import('../modules/private/users/views/indexView.vue'),
            name:'users'
        },
        {
            path:'permissions',
            component: ()=>import('../modules/private/users/views/permisssions.vue'),
            name:'permissions'
        },

        {
            path:'products',
            component: ()=>import('../modules/private/inventory/views/Products.vue'),
            name:'products'
        },
        {
            path:'products/new',
            component: ()=>import('../modules/private/inventory/views/CreateProduct.vue'),
            name:'products-new'
        },
        {
            path:'company',
            component: ()=>import('../modules/private/company/views/index.vue'),
            name:'company'
        },
        {
            path:'stores',
            component: ()=>import('../modules/private/store/views/store.vue'),
            name:'stores'   
        },
        {
            path:'incomes',
            component: ()=>import('../modules/private/income/views/incomes.vue'),
            name:'incomes'
        },
        {
            path:'incomes/new',
            component: ()=>import('../modules/private/income/views/incomeForm.vue'),
            name:'incomes-new'
        },
        {
            path:'sale-order',
            component: ()=>import('../modules/private/billing/pos/ProductAvaliable.vue'),
            name:'sale-order'
        }

    ]

    }

]

 const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to,__, next)=>{

    const {isAuth} = storeToRefs(authStore())

    console.log(isAuth.value)
    if (isAuth.value) {
        next()
    }else{
        next()
        //to.path === '/' ? next() : next('/')
    }
})

export default router
