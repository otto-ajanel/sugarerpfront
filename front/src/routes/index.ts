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
            component: ()=>import('../modules/private/inventory/views/Product.vue'),
            name:'products'
        }
    ]

    }

]

 const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to,from, next)=>{

    const {isAuth} = storeToRefs(authStore())
    console.log(isAuth)

    if (isAuth) {
        next()
    }else{
        next('/')
    }
})

export default router
