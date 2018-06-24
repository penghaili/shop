<template>
    <div class="wrap">
        <router-view class="home"></router-view>
        <div class="footer">
            <span><router-link :to="{name:'home'}"><i class="icon iconfont icon-iconhuidaoshouye"></i><b>首页</b></router-link></span>
            <span><router-link :to="{name:'catagory'}"><i class="icon iconfont icon-gongzuo"></i>分类</router-link></span>
            <span class="cont"><router-link :to="{name:'home'}"><i class="icon iconfont icon-dazhongdianping"></i>社交</router-link></span>
            <span><router-link :to="{name:'cart'}"><i class="icon iconfont icon-gouwuche"></i>购物车</router-link></span>
            <span><router-link :to="{name:'mine'}"><i class="icon iconfont icon-wode"></i>我的</router-link></span>
        </div>
    </div>
</template>
<script>

export default {
    name:'index',
    data(){
        return {
        }
    }
}
</script>
<style src="./index.less" scoped>
</style>
