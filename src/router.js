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
import verify from './components/VerifyPhone'
import addPhone from './components/AddPhone'
import editProfile from './components/EditProfile'
import profile from './components/Profile'
import orders from './components/Orders'
import order from './components/SingleOrder'
import forgetPassword from './components/forgetPass'
import newPass from './components/NewPass'

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
            path:'/login',component:login,name:'login'
        },
        {
            path:'/register',component:register, name: 'register'
        },
        {
            path:'/cart',component:cart,
        }, 
        {
            path:'/verify',component:verify
        },
        {
            path:'/editProfile',component:editProfile
        },
        {
            path:'/profile',component:profile, name: 'profile',
        },
        {
            path:'/orders',component:orders,
        },
        {
            path:'/orders/:order',
            component:order,
            name:'order.show'
        },
        {
            path:'/forgetPassword',component:forgetPassword
        },
        {
            path:'/newPass',component:newPass
        },
        {
            path:'/addPhone',component:addPhone,
            beforeRouteUpdate  (to,from,next){
                if(from.path  == '/login');
                else{
                    next('/')
                }
                next()
            }
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
    if(document.querySelector('.mobile.show')){
        document.querySelector('.mobile').classList.remove('show')
        document.querySelector('.navbar_mobile').classList.remove('show')
    }
    if(to.params.branch){
        localStorage.setItem('current_branchId',JSON.stringify(to.params.branch))
    }
    localStorage.setItem('router_previous',JSON.stringify(from.path));
    next()
})

export default router;
