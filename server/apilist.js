const fs = require('fs');
const path = require('path')
const jwt = require('jsonwebtoken')
//定义接口
module.exports = function (app){
    //首页商品列表接口
    const goodsPath = path.resolve(__dirname+'/goodslist')
    app.get('/index/recommend.action',(req,res)=>{
        if(req.query>3){
            res.json({
                code:1000,
                msg:'没有更多数据了'
            })
        }else{
            let list = fs.readFileSync(goodsPath+`/list${req.query.page}.json`,'utf-8')
            setTimeout(()=>{
                res.json(list)
            },2000)
        }
    })
    //分类接口
    const queryApi = require('./queryApi')
    app.get('/api/catagory',(req,res)=>{console.log(req.query)
        queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data=>{
            res.end(data)
        })
    })
    //注册接口
    app.post('/api/user/register',(req,res)=>{
       //console.log(req.body)
       let userpath = path.resolve(__dirname+'/user')
       let userlist = JSON.parse(fs.readFileSync(userpath+'/userlist.json','utf-8'))
      
       if(userlist.some(element => {
           return element.username==req.body.username 
       })){
        res.json({
            msg:'failed',
            imfo:"该用户已存在",
            code:1
        })
        return
       }
       userlist.push(req.body)
       fs.writeFile(userpath+'/userlist.json',JSON.stringify(userlist),function(err){
           if(err){
                res.json({
                    msg:err,
                    code:0
                })
           }else{
                res.json({
                    msg:'success',
                    code:1
                })
           }
       })
    })
    //登录接口
    app.post('/api/user/login',(req,res)=>{
       let userpath = path.resolve(__dirname+'/user')
       let userlist = JSON.parse(fs.readFileSync(userpath+'/userlist.json','utf-8'))
       if(userlist.some(item => {
           return item.username===req.body.username && item.password===req.body.password
       })){
            let token = jwt.sign(req.body,'1601E',{expiresIn:60*60})
            res.json({
                msg:'success',
                code:1,
                token
            })
       }else{
           res.json({
                msg:'用户名或密码错误',
                code:0,
           })
       }
    })
    //购物车商品列表
    app.post('/api/goodslist',(req,res)=>{
        jwt.verify(req.body.token,'1601E',function(err,decoded){
            if(err){
                res.json({
                    msg:err,
                    code:0
                })
            }else{
                let goods = JSON.parse(fs.readFileSync(__dirname+'/cartlist/cartlist.json','utf-8'))
                console.log(decoded)
                res.json({
                    msg:'success',
                    code:1,
                    data:goods[decoded.username]
                })
            }
        })
        
    })
    //添加购物车
    app.post('/api/addcart',(req,res)=>{
        if(!req.body.token){
            res.json({
                msg:'参数错误，比传字段，token缺失',
                code:2
            })
            return;
        }
        jwt.verify(req.body.token,'1601E',(err,decoded)=>{
            if(err){
                res.json({
                    msg:'登录超时，请重新登录',
                    code:'0'
                })
            }else{
                const cartpath = __dirname+'/cartlist/cartlist.json'
                let cartlist = JSON.parse(fs.readFileSync(cartpath,'utf-8'))
                if(cartlist[decoded.username]){
                    let flag = false;
                    cartlist[decoded.username].forEach((item,index)=>{
                        
                        if(item.wname==req.body.data.wname){
                            ++item.count;
                            flag = true
                        }
                    })
                    if(!flag){
                        let o = {
                            ...req.body.data,
                            count:1
                        }
                        cartlist[decoded.username].push(o)
                    }
                }else{
                    cartlist[decoded.username] = [{count:1,...req.body.data}];
                }
                fs.writeFileSync(cartpath,JSON.stringify(cartlist),(err)=>{
                    if(err){
                        res.json({
                            msg:'请重新写入',
                            code:'0'
                        })
                    }else{
                        res.json({
                            msg:'添加成功',
                            code:1
                        })
                    }
                })
                res.json({
                    msg:'添加成功',
                    code:1
                })
            }
        })
    })

    //修改购物车数量
    app.post('/api/cart/count',(req,res)=>{
        if(!req.body.token){
            res.json({
                msg:'参数错误，比传字段，token缺失',
                code:2
            })
            return;
        }
        jwt.verify(req.body.token,'1601E',(err,decoded)=>{
            if(err){
                res.json({
                    msg:'登录超时，请重新登录',
                    code:'0'
                })
            }else{
                const cartpath = __dirname+'/cartlist/cartlist.json'
                let cartlist = JSON.parse(fs.readFileSync(cartpath,'utf-8'))
                let goodslist = cartlist[decoded.username]
                //操作数据库
                goodslist = goodslist.map((item,index)=>{
                    
                    if(item.wname == req.body.goodsname){
                        item.count = req.body.count
                    }
                    return item
                })
                cartlist[decoded.username] = goodslist
                fs.writeFileSync(cartpath,JSON.stringify(cartlist),(err)=>{
                    if(err){
                        res.json({
                            msg:'请重新写入',
                            code:'0'
                        })
                    }else{
                        res.json({
                            msg:'修改成功',
                            code:1
                        })
                    }
                })
            }
        })
    })
}
