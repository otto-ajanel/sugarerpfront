import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
    /* {
        path:'/',
        component: ()=>import('../layouts/public.vue')
    }, */
     {
    path:'/',
    component: ()=>import('../layouts/sugarErp.vue'),
    children: [
        
    ]
    
    }

]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})

