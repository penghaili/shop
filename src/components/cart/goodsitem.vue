<template>
    <div>
        <ul>
            <li>
                <input type="checkbox" name="" id="">
                <dl>
                    <dt><img :src="data.imageurl" alt=""></dt>
                    <dd>
                        <p class="text">{{data.wname}}</p>
                        <div class="con">
                            <b>￥{{data.jdPrice}}</b>
                            <span @click="decrement">-</span>
                            <span>{{data.count}}</span>
                            <span @click="increment">+</span>
                        </div>
                    </dd>
                </dl>
            </li>
        </ul>
    </div>
</template>
<script>
import {getCookie,bus} from '../../utils/utils.js'
export default {
    props:{
        data:{
            required:true,
            type:Object
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        decrement(){
            let count = this.data.count;
            this.$http.post('/api/cart/count',{
                token:getCookie('token'),
                count:count-1,
                goodsname:this.data.wname
            }).then(res=>{
                if(res.code==1){
                    bus.$emit('update')
                }
            })
        },
        increment(){
            let count = this.data.count;
            this.$http.post('/api/cart/count',{
                token:getCookie('token'),
                count:count+1,
                goodsname:this.data.wname
            }).then(res=>{
                if(res.code==1){
                    bus.$emit('update')
                }
            })
        }
    }
}
</script>

<style scoped>
ul li{
    height:1.5rem;
    display: flex;
    align-items: center;
    padding-left: .07rem;
    margin-bottom: .1rem;
    background: #fff;
}
ul li input{
    width:.2rem;
    height:.2rem;
}
dl{
    height:1rem;
    display: flex;
}
dl dt{
    height: .7rem;
}
dl dt img{
    height:1rem;
    margin:0 .05rem;
}
dl dd p{
    width:1.7rem;
    line-height: .2rem;
}
.con{
    line-height: .7rem;
}
.con :nth-child(3){
    width:.5rem;
    height:.25rem;
    text-align: center;
}
.con span{
    width:.25rem;
    height:.25rem;
    line-height: .25rem;
    text-align: center;
    display: inline-block;
    border:1px solid #ccc;
    background: #fff;
}
.text{
	overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
