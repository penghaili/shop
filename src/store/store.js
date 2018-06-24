import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {httpInstance} from '../utils/request.js'
let store = new Vuex.store({
    state:{
        catagoryData:{

        },
    },
    mutations:{
        updateList(state,payload){
            state.catagoryData[payload.id] = payload.data.secondLevelCategories;
        }
    },
    actions:{
        fetchList({commit},cid){
            httpInstance.get(`/api/catagory?cid=${cid}`).then(res=>{
                //this.list = res.secondLevelCategories
                commit('updateList',{
                    id:cid,
                    data:res
                })
            })
            
        }
    },
    getters:{},
    modules:{}
})
store.subscribe(()=>{
    console.log(store,state.ccatagoryData)
})