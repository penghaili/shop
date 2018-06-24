<template>
    <div class="shopCart">
        <header>
            <span><i class="icon iconfont icon-xiangzuo"></i></span>
            <span>购物车</span>
            <span><b>编辑</b><i class="icon iconfont icon-xiaoxi"></i></span>
        </header>
        <div class="cartContent">
            <div>
                你的购物车空空，买点啥不？
            </div>
            <goods-item v-on:update="fetchList" v-for="(val,index) in data" :key="index" v-bind:data="val"></goods-item>
        </div>
        <div class="cartButton">
           
				<input type="checkbox">
				<span>全选</span>
                <span>合计<b>$0</b></span>
                <span>(运费：￥0)</span>
                <button>结算</button>
				
		</div>
    </div>
</template>

<script>
import {getCookie,bus} from '../../utils/utils'
import goodsitem from './goodsitem.vue';
export default {
    data(){
        return {
            data:[]
        }
    },
    mounted(){
        //请求购物车列表
        // this.$http.post('/api/goodslist',{
        //     token:getCookie('token')
        // }).then(res=>{
        //     if(res.code==0){
        //         this.$router.push({
        //             name:'login',
        //             query:{
        //                 from:'cart'
        //             }
        //         })
        //     }else{
        //         console.log(res)
        //     }
        // })
       
    },
    created(){
         this.fetchList();
         bus.$on('update',function(){
             
         })
    },
    methods:{
        fetchList(){
            this.$http.post('/api/goodslist',{
                token:getCookie('token')
            }).then(res=>{
                if(res.code==0){
                    if((confirm('登录超时，请重新登录'))){
                        this.$router.push({
                            name:'login',
                            query:{
                                from:'cart'
                            }
                        })
                    }else{

                    }
                }else{
                    this.data = res.data
                }
            })
        }
    },
    components:{
        "goods-item":goodsitem
    }
}
</script>

<style src="./cart.less" scoped>

</style>
