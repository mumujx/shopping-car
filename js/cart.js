// 全局过滤器
Vue.filter("money", function(value, type){
    return "￥" + value.toFixed(2) + type;
});
new Vue({
    el:'#app',
    data:{
        totalMoney:0,
        totalPrice:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        carProduct:''
    },
    // 局部过滤器
    filters:{
        formatMoney: function(value){
            return "￥" + value.toFixed(2);
        }
    },
    mounted:function(){
        this.cartView();
    },
    methods:{
        cartView: function(){
            var _this = this;
            this.$http.get('data/cartData.json', {'id':123}).then(function(rtv) {
                _this.productList = rtv.body.result.list;
                _this.totalMoney = rtv.body.result.totalMoney;
            });
        },
        changeMoney:function(product, way){
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct:function(item){
            if(typeof item.checked == 'undefined'){
                // 全局set一个data中没有的属性
                // Vue.set(item,'checked', true);
                // 局部set一个data中没有的属性
                this.$set(item,'checked', true)  
            }else{
                item.checked = !item.checked
            }
            this.calcTotalPrice();
        },
        // 全选和取消全选 
        checkAll: function(flag){
            this.checkAllFlag = flag
            var _this = this;
            this.productList.forEach(function(item, index){
                if(typeof item.checked == 'undefined'){
                    _this.$set(item, 'checked', _this.checkAllFlag);

                }else{
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function(){
            var _this = this;
            this.totalPrice = 0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    _this.totalPrice += item.productQuantity * item.productPrice;
                }
            });
        },
        delConfirm: function(item){
            this.delFlag = true;
            this.carProduct = item;
        },
        delProduct: function(){
            var index = this.productList.indexOf(this.carProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});
