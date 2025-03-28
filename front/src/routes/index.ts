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
            path:'customer',
            component: ()=>import('../layouts/customer.vue'),
            name:'customer'
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
