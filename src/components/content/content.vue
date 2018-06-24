<template>
    <div class="content">
        <h6>商城动态</h6>
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心，健康第一，安全保证，确保蔬菜新鲜</div>
                <div class="swiper-slide">绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心，健康第一，安全保证，确保蔬菜新鲜</div>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    mounted(){
        new Swiper(this.$refs.swiper,{
            autoplay:true,
            direction:'vertical',
            loop:true
        })
    }
}
</script>
<style src="./content.less" scoped>

</style>


