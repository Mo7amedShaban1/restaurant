<template>
    <div>
        <div class="single-product grid-l" v-show="hiddenProduct">
            <ul class="nav list-rest">
                <li><a @click="routerBack" style="cursor:pointer"><i class="fas fa-arrow-left"></i></a></li>
            </ul>
            <img :src="productInfo.media.image.url" class="mw-100" v-if="productInfo.media">
            <div class="info">
                <div class="title-price">
                    <h4> {{ productInfo.name }} </h4>
                    <span class="price">${{ parseFloat(productInfo.price) + cost }}</span>
                </div>
                <p class="details">
                    {{ productInfo.description }}
                </p>
            </div>
            <form action="">
                <div class="quantity pt-3 pb-3">
                    <h4 class="co-gray w-100 capitalize mb-3">quantity</h4>
                    <div class="control">
                        <button type="dec" @click.stop.prevent="counter('dec')">-</button>
                        <button type="inc" @click.stop.prevent="counter('inc')">+</button>
                    </div>
                    <input class="number" type="number" v-model="quantity" min="1">
                </div>

                <div class="size_additional pt-3 pb-3" v-for="custom_attribute in productInfo.custom_attributes" :key="custom_attribute.id">
                    <h4 class="co-gray w-100 capitalize mb-3">{{ custom_attribute.name }}</h4>
                    <template v-for="(option) in custom_attribute.options">
                        <div v-if="! custom_attribute.is_multi_select">
                            <input type="radio" ref="option" :data-cost="option.cost" :id="option.id" :name="custom_attribute.name" v-model="options.single_option" :value="option.id">
                            <label :for="option.id">{{ option.name }}</label>
                        </div>
                        <div v-if="custom_attribute.is_multi_select">
                            <input type="checkbox" ref="option" :data-cost="option.cost" :id="option.id" :value="option.id" v-model="options.multiple_option">
                            <label :for="option.id">{{ option.name }}</label>
                        </div>
                    </template>
                </div>

            </form>

            <div class="pt-3 pb-3">
                <h4 class="co-gray w-100 capitalize mb-3">specail notes</h4>
                <p class="capitalize co-gray mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus</p>
            </div>
            <button class="default_btn" @click="addToCart(productInfo)">add to cart</button>
        </div>
        
        <div class="spinner inherit" v-if="!hiddenProduct">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            all_options:[],
            options:{
                single_option:'',
                multiple_option:[]
            },
            cost:0,
            quantity:1,
            currentProductId:this.$route.params.product,
            currentBranchId:this.$route.params.branch,
            storeBranchCartId:JSON.parse(localStorage.getItem('storeBranchCartId')),
            productInfo:'',
            hiddenProduct: false,
        }
    },
    created(){
        this.product()
        this.currentBranchId = this.$route.params.branch;
    },
    watch: {
        options:{
            handler(value){
                const newSingleValue = [value.single_option]
                const newMultipleValue = value.multiple_option;
                this.all_options = [...newSingleValue,...newMultipleValue];
                this.calcCostAddition()
            },
            deep: true,
        }
    },
    methods:{
        product(){
            this.currentProductId = this.$route.params.product;
            this.axiosInstance.get(`products/${this.currentProductId}`)
            .then((response) => {
                setTimeout(() => {
                    this.hiddenProduct = true;
                },1000)
                return response.data.data;
            }).then((res) => {
                this.productInfo = res
            })
        },
        routerBack(){
            this.$router.go(-1)
        },
        counter(type){
            if(type == "inc"){
                this.quantity++
            }else{
                if(this.quantity <= 1)
                return;
                else{
                    this.quantity--
                }
            }
        },
        calcCostAddition(){
            let inputValue = []
            this.$refs.option.filter(element => {
                if(element.checked){
                    inputValue.push(parseFloat(element.getAttribute('data-cost')))
                    this.cost = inputValue.reduce((acc,curr) => {
                        return acc + curr
                    },0)
                }
            });
        },
        optionsSort(){
            this.all_options.sort();
            return this.all_options.filter(item => {
                return item
            });
        },
        addToCart(productInfo){

            let storeProuct = {
                id:productInfo.id,
                name:productInfo.name,
                description:productInfo.description,
                price:parseFloat(productInfo.price) + this.cost,
                quantity:parseFloat(this.quantity),
                image:productInfo.media.image.url,
                options:this.optionsSort(),
                branchid:this.currentBranchId,
            }

            const ifPropExist = () => {
                if(JSON.parse(localStorage.getItem('restaurant_cart'))){
                    let oldData = JSON.parse(localStorage.getItem('restaurant_cart'))
                    let productExists = false;

                    oldData.forEach((item, index) => {
                        if(item.id == storeProuct.id) {
                            let itemOptions = item.options.join();
                            let productOptions = storeProuct.options.join();
                            
                            if(productOptions  == itemOptions){
                                productExists = index;
                            }
                        }
                    });
                    if (productExists !== false) {
                        oldData[productExists].quantity += storeProuct.quantity;
                    } else {
                        oldData = [storeProuct,...oldData]
                    }

                    localStorage.setItem('restaurant_cart',JSON.stringify(oldData))

                }

                else{
                    localStorage.setItem('restaurant_cart',JSON.stringify([storeProuct]))
                    localStorage.setItem('storeBranchCartId',JSON.stringify(this.currentBranchId))
                    console.log(JSON.parse(localStorage.getItem('storeBranchCartId')))
                }
            }

            if(!JSON.parse(localStorage.getItem('storeBranchCartId'))){
                ifPropExist()
                document.querySelector('.notify.success').classList.add('active');
                setTimeout(() =>{
                    document.querySelector('.notify.success').classList.remove('active')
                },3000)
            }
            else{
                if(JSON.parse(localStorage.getItem('storeBranchCartId')) == storeProuct.branchid){
                    ifPropExist()
                    document.querySelector('.notify.success').classList.add('active');
                    setTimeout(() =>{
                        document.querySelector('.notify.success').classList.remove('active')
                    },3000)
                }
                else{
                    document.querySelector('.notify.warning').classList.add('active');
                setTimeout(() =>{
                    document.querySelector('.notify.warning').classList.remove('active')
                },3000)
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>
