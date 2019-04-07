import Vue from 'vue'
import VueRouter from 'vue-router'
import allProduct from './components/allProduct'
import productDetails from './components/productDetails'
import chooseBranch from './components/GoToChooseBranch'
import login from './components/Login'
import checkout from './components/CheckOut'
import register from './components/Register'
import cart from './components/Cart'
import oops from './components/Oops'
import thank from './components/Thank'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes : [
        {
            path:'/',component:chooseBranch,
        },
        {
            path:'/branches/:branch/products', 
            name: 'branches.products.index',
            component:allProduct,
        },
        {
            path:'/branches/:branch/products/:product',
            name: 'products.show',
            component:productDetails,
        },
        {
            path:'/login',component:login,
        },
        {
            path:'/register',component:register
        },
        {
            path:'/cart',component:cart,
        }, 
        {
            path:'/checkout',component:checkout,
            beforeEnter(to,from,next){
                if(JSON.parse(localStorage.getItem('restaurant_cart')));
                else{
                    next('/')
                }
                next()
            }
        },
        {
            path:'/oops',component:oops
        },
        {
            path:'/thank',component:thank,
            beforeEnter(to,from,next){
                if(from.path  == '/checkout');
                else{
                    next('/')
                }
                next()
            }
        },
        {
            path:'*',component:oops
        } 
    ]
})

router.beforeEach((to, from, next) => {
    localStorage.setItem('router_previous',JSON.stringify(from.path));
    next()
})

export default router;
