<template>
    <div class="detail">
        <iframe class="iframe" :src="$route.query.url" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    mounted(){
        console.log(this.$route.query.url)
    }
}
</script>

<style scoped>
.detail{
    width:100%;
    height:100%; 
}
.iframe{
    width:100%;
    height:100%;
}
</style>

