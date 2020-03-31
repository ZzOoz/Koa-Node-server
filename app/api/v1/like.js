const Router = require('koa-router')
const router = new Router({
    prefix:"/v1"
})
const {success} = require('../../lib/helper')
// 引入Auth权限验证
const {Auth} = require('../../../middleware/auth')
const {LikeValidator} = require('../../validator/validator')
const {Favor} = require('../../model/favor')

// 点赞路由
router.post('/like',new Auth().m,async (ctx,next)=>{
    const v = await new LikeValidator().validate(ctx,{
        // lin-validator支持别名 因为LikeValidator继承PostiveValidator
        // 而PostiveValidator的规则是this.id校验 LikeValidator是校验art_id
        // 所以使用别名
        id:"art_id" 
    })
    await Favor.like(v.get('body.art_id'),v.get('body.type'),ctx.auth.uid)
    success()
})

// 取消点赞路由
router.post('/like/cancel',new Auth().m,async (ctx,next)=>{
    const v = await new LikeValidator().validate(ctx,{
        // lin-validator支持别名 因为LikeValidator继承PostiveValidator
        // 而PostiveValidator的规则是this.id校验 LikeValidator是校验art_id
        // 所以使用别名
        id:"art_id" 
    })
    await Favor.dislike(v.get('body.art_id'),v.get('body.type'),ctx.auth.uid)
    success()
})

module.exports = router