import { createWebHistory, createRouter } from "vue-router";
import { authStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const routes = [
      {
        path:'/',
        component: ()=>import('../layouts/public.vue')
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
       /*  {
            path:'autorizations',
            component: ()=>import('../modules/private/products/Views/indexView.vue'),
            name:'autorizations'
        }, */
        {
            path:'products',
            component: ()=>import('../modules/private/inventory/views/Products.vue'),
            name:'products'
        },
        {
            path:'products/new',
            component: ()=>import('../modules/private/inventory/views/CreateProduct.vue'),
            name:'products-new'
        }
    ]

    }

]

 const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((_,__, next)=>{

    const {isAuth} = storeToRefs(authStore())

    if (isAuth) {
        next()
    }else{
        next('/')
    }
})

export default router
