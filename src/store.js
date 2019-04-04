// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)

// export default new Vuex.Store({
//     state: {
//         storeBranchId:JSON.parse(localStorage.getItem('cart_branchId')),
//         cart: JSON.parse(localStorage.getItem('restaurant_cart')),
//     },
//     mutations: {
//         // ADD_TO_CART: (state,product) => {

//         //     // Save Current Branch Id to local storage 
//         //     if(!state.storeBranchId){
//         //         document.querySelector('.notify.success').classList.add('active');
//         //         setTimeout(() =>{
//         //             document.querySelector('.notify.success').classList.remove('active')
//         //         },3000)
//         //         localStorage.setItem('cart_branchId',JSON.stringify(product.branchid))
//         //         state.storeBranchId = JSON.parse(localStorage.getItem('cart_branchId'));
//         //         ifPropExist()
//         //     }
//         //     else{
//         //         if(state.storeBranchId == product.branchid){
//         //             document.querySelector('.notify.success').classList.add('active');
//         //             setTimeout(() =>{
//         //                 document.querySelector('.notify.success').classList.remove('active')
//         //             },3000)
//         //             ifPropExist()
//         //         }
//         //         else{
//         //             document.querySelector('.notify.warning').classList.add('active');
//         //             setTimeout(() =>{
//         //                 document.querySelector('.notify.warning').classList.remove('active')
//         //             },3000)
//         //         }
//         //     }
//         //     function ifPropExist(){
//         //         if(localStorage.getItem('restaurant_cart')){
//         //             let oldData = JSON.parse(localStorage.getItem('restaurant_cart'))
                    
//         //             let productExists = false;

//         //             oldData.forEach((item, index) => {
//         //                 if(item.id == product.id) {
//         //                     let itemOptions = item.options.join();
//         //                     let productOptions = product.options.join();
                            
//         //                     if(productOptions  == itemOptions){
//         //                         productExists = index;
//         //                     }
//         //                 }
//         //             });
//         //             if (productExists !== false) {
//         //                 oldData[productExists].quantity += product.quantity;
//         //             } else {
//         //                 oldData = [product,...oldData]
//         //             }
//         //             localStorage.setItem('restaurant_cart',JSON.stringify(oldData))
//         //             state.cart = JSON.parse(localStorage.getItem('restaurant_cart'));                
//         //         }
//         //         else{
//         //             localStorage.setItem('restaurant_cart',JSON.stringify([product]))
//         //             state.cart = JSON.parse(localStorage.getItem('restaurant_cart'));
//         //         }
//         //         state.quantity = 1;
//         //     }
//         // },
//     },
// })