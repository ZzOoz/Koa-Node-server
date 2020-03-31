const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/user'
})

const {TokenValidator,NotEmptyValidator} = require('../../validator/validator')
const {LoginType} = require('../../lib/enum')
// 获取User模型,处理数据库数据
const {User} = require('../../model/user')
const {success} = require("../../lib/helper")
// 导入生成token方法
const {generateToken} = require('../../../core/util')

// 引入微信服务
const {WxMannager} = require("../../service/wx")

const {Auth} = require('../../../middleware/auth')
router.post('/token',async (ctx,next)=>{
    // 获取参数，校验参数
    const v = await new TokenValidator().validate(ctx)
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await eamilandPassword(v.get('body.account'),v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WxMannager.codeToToken(v.get('body.account'))
            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }

    ctx.body = {
        token
    }
})

// 验证token的合法性
router.post('/verify',async (ctx,next)=>{
    const v =await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        is_valid:result
    }
})

async function eamilandPassword(account,secret){
    const user = await User.verifiyEamilandPassword(account,secret)
    return generateToken(user.id,Auth.USER) // 定义user的权限为8
    
}

module.exports = router