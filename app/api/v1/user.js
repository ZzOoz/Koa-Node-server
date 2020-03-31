const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/user'
})

const {RegisterValidator} = require('../../validator/validator')

// 获取User模型,处理数据库数据
const {User} = require('../../model/user')
const {success} = require("../../lib/helper")
router.post('/register',async (ctx,next)=>{
    // 获取参数，校验参数
    const v = await new RegisterValidator().validate(ctx)

    const user = {
        email:v.get('body.email'),
        password:v.get('body.password2'),
        nickname:v.get('body.nickname')
    }
    // 创建用户
    const u = await User.create(user)

    success() // 抛出成功异常
})

module.exports = router