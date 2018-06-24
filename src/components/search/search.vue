<template>
    <div>
        <header>
            <input @input="search" type="text" v-model="keywords">
        </header>
        <ul v-html="htmls">

        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            keywords:'',
            htmls:''
        }
    },
    methods:{
        search(){
            this.$http.get(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.keywords}j&dotime=1528960286000`)
            .then(res=>{
                console.log(res)
                this.htmls = res
            })
        }
    }
}
</script>
<style>

</style>


