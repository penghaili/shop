<template>
    <div class="banner">
        <header>
            <span>717</span>
            <input @click="gotoDetail" type="text" placeholder="请输入您要购买的商品">
            <!-- <div class="cur"><i class="icon iconfont icon-quora"></i></div> -->
            <!-- <div class="cur"><i class="icon iconfont icon-xiaoxi"></i><b>消息</b></div> -->
        </header>
        <div class="listWrap" @scroll="onScrollFn" ref="wrap">
             <div class="swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="../../assets/images/2.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/images/3.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/images/2.jpg" alt=""></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div ref="icon">
                <icon></icon>
            </div>
            <div ref="contents">
                <contents></contents>
            </div>
            <ul ref="list">
                <li v-for="(item,index) in list" :key="index">
                    <lists v-bind:data="item"></lists>
                </li>
            </ul>
            <p class="tips">{{tips}}</p>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import icon from '../icon/icon';
import contents from '../content/content';
import jsonp from '../../utils/jsonp';
import lists from '../lists/lists';
export default {
    data(){
        return {
            //url:'https://m.jd.com/index/recommend.action?_format_=json&page=1'
            list:[],
            canIQuery:true,
            page:1,
            tips:"正在为您加载数据..."
        }
    },
    methods:{
        gotoDetail(){
           this.$router.push({
               name:'search'
           }) 
        },
        onScrollFn(){
            let winH = this.$refs.wrap.offsetHeight;
            let docH = this.$refs.list.offsetHeight+this.$refs.swiper.offsetHeight+this.$refs.icon.offsetHeight+this.$refs.contents.offsetHeight
            let scrollH = this.$refs.wrap.scrollTop;
            //console.log(winH,docH,scrollH)
            //console.log(this.$refs.icon.offsetHeight)
            //console.log(this.$refs.contents.offsetHeight)
            //console.log(this.$refs.list.offsetHeight)
            if(docH-winH-scrollH<30 && this.canIQuery){
                //console.log('接近底部')
                this.page++;
                this.canIQuery = false;
                this.$http(`/index/recommend.action?page=${this.page}`).then(res=>{
                    //console.log(res)
                    if(res.code===1000){
                        this.tips = '已经到底啦'
                    }else{
                         this.list = [...this.list,...JSON.parse(JSON.parse(res).recommend).wareInfoList]
                         //console.log(this.list)
                    }
                    this.canIQuery = true;
                })
            }
        }
    },
    mounted(){
        //实例化swiper
        new Swiper(this.$refs.swiper,{
            autoplay:true,
            loop:true,
            pagination: {
                el: '.swiper-pagination',
            }
        })
        //列表商品初始请求
        this.$http(`/index/recommend.action?page=${this.page}`).then(res=>{
            //console.log(res)
            this.list = JSON.parse(JSON.parse(res).recommend).wareInfoList
            console.log(this.list)
        });
        // this.$http.post('/api/user/login',{
        //    name:'jacky',
        //    token:'123'
        // }).then(res=>{
        //     console.log(res)
        // })
    },
    components:{
        icon,
        contents,
        lists
    }
}
</script>

<style src="./home.less" scoped>
</style>

