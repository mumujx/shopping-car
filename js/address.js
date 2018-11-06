new Vue({
    el: '.container',
    data: {
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted: function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods: {
        getAddressList:function(){
            var _this = this;
            this.$http.get("data/address.json").then(function (rtv) {
                var res = rtv.data;
                if(res.status == "0"){
                    _this.addressList = res.result;
                }
            });
        },
        setDefault: function(addressId){
            this.addressList.forEach(function(address, index){
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        }
    }
});