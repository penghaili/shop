<template>
    <div class="catagory">
        <header>
            <span><i class="icon iconfont icon-xiangzuo"></i></span>
            <input type="text" @click="goToSearch" placeholder="您要购买的商品">
            <span><i class="icon iconfont icon-shoucang"></i></span>
        </header>
        <div class="content">
            <div class="contentLeft">
                <aside>
                    <p @click="getData(17951827)" :class="code==17951827?'active':''" data-id="17951827">热门分类</p>
                    <p @click="getData(17951828)" :class="code==17951828?'active':''" data-id="17951828">手机数码</p>
                    <p @click="getData(17951829)" :class="code==17951829?'active':''" data-id="17951829">电脑办公</p>
                    <p @click="getData(17951830)" :class="code==17951830?'active':''" data-id="17951830">电视影音</p>
                    <p @click="getData(17951831)" :class="code==17951831?'active':''" data-id="17951831">空调冰洗</p>
                    <p @click="getData(17951832)" :class="code==17951832?'active':''" data-id="17951832">厨房卫浴</p>
                    <p @click="getData(17951833)" :class="code==17951833?'active':''" data-id="17951833">生活电器</p>
                    <p @click="getData(17951834)" :class="code==17951834?'active':''" data-id="17951834">食品酒水</p>
                    <p @click="getData(17951835)" :class="code==17951835?'active':''" data-id="17951835">美妆个护</p>
                    <p @click="getData(17951836)" :class="code==17951836?'active':''" data-id="17951836">母婴玩具</p>
                    <p @click="getData(17951837)" :class="code==17951837?'active':''" data-id="17951837">医疗保健</p>
                    <p @click="getData(17951838)" :class="code==17951838?'active':''" data-id="17951838">服饰鞋帽</p>
                    <p @click="getData(17951839)" :class="code==17951839?'active':''" data-id="17951839">运动户外</p>
                    <p @click="getData(17951840)" :class="code==17951840?'active':''" data-id="17951840">箱包奢品</p>
                    <p @click="getData(17951841)" :class="code==17951841?'active':''" data-id="17951841">钟表首饰</p>
                </aside>
            </div>
        <div class="contentRight">
                <div class="cont" v-for="(item,index) in shoplist" :key="index">
                    <div class="floor">
                        <p class="title">{{item.goodsTypeName}}</p>
                        <dl v-for="(v, idx) in item.goodsTypeList" :key="idx">
                            <dt><img :src="v.goodsTypeImgUrl" alt=""></dt>
                            <dd>{{v.goodsTypeName}}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            shoplist:[],
            code:17951827
        }
    },
    methods:{
        getData(cid){
            this.code = cid;
            this.$http.get(`/api/catagory?cid=${cid}`).then(res=>{
                console.log(res)
                this.shoplist = res.secondLevelCategories
                //console.log(this.shoplist)
            }) 
            //this.$store.dispatch('fetchList',id)
        },
        goToSearch(){
            this.$router.push({
                name:'search'
            })
        }
    },
    mounted(){
        this.getData('17951827')
    }
}
</script>

<style src="./catagory.less" scoped>

</style>

