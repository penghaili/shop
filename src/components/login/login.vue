<template>
    <div class="login">
        <header>登录</header>
        <p><label for="username">用户名</label><input v-model="username" id="username" type="text" placeholder="请输入手机号"></p>
        <p><label for="password">密码</label><input v-model="password" id="password" type="password" placeholder="请输入至少6位数字"></p>
        <button @click="goLogin">登录</button><button @click="goTo">注册</button>
    </div>
</template>
<script>
import { setCookie } from '../../utils/utils';
export default {
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        goLogin(){
            let regPhone = /^1[3578]\d{9}$/;
            if(!regPhone.test(this.username)){
                alert('请输入正确的手机号')
            }
            let regPassword = /\d{6,}/
            if(!regPassword.test(this.password)){
                alert('请输入正确的密码格式')
            }
            if(!username||!password){
                alert('请填写所有信息')
                return
            }
            this.$http.post('/api/user/login',{
                username:this.username,
                password:this.password
            }).then(res=>{
                if(res.code==1){
                    setCookie('token',res.token)
                    //document.cookie = `token=${res.token}`
                    this.$router.push({
                        name:this.$route.query.from || "home"  
                    })
                }else{
                    console.log(res.msg)
                }
            })
        },
        goTo(){
             this.$router.push({
                 name:'register'
            })
        }
    },
    mounted(){
        //document.cookie = 'classname=1601E'
        console.log(this.$route);
    }
}
</script>

<style src="./login.less">

</style>