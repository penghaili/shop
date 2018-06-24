<template>
    <!-- <a :href="data.clickUrl"> -->
        <dl @click="goToDetail">
            <dt>
                <img v-lazy="data.imageurl" alt="">
            </dt>
            <dd>
                <p>{{data.wname}}</p>
                <div class="price">
                    <span>￥{{data.jdPrice}}</span>
                    <span @click.stop="addCart"><i class="icon iconfont icon-gouwuche"></i></span>
                </div>
            </dd>
        </dl>
    <!-- </a> -->
</template>
<script>
import {getCookie} from '../../utils/utils'
export default {
    props:{
        data:{
            required:true,
            type:Object
        }
    },
    methods:{
        addCart(){
           if(!getCookie('token')){
               this.$router.push({
                        name:"login"
                })
                return
           }
            this.$http.post('/api/addcart',{
                token:getCookie('token'),
                data:this.data
            }).then(res=>{
                if(res.code===1){
                    console.log('添加成功')
                }else{
                    console.log(res.msg)
                }
            })
        },
        goToDetail(){
            console.log(this.data)
            this.$router.push({
                name:'detail',
                query:{
                    url:encodeURI(this.data.clickUrl)
                }
            })
        }
    }
}
</script>
<style src="./lists.less" scoped>
</style>


