const Router = require('koa-router')
const router = new Router({
    prefix:"/v1/classic"
})
const {Flow} = require('@model/flow')
const {Art} = require('../../model/art')
// 引入Auth权限验证
const {Auth} = require('../../../middleware/auth')
const { LikeValidator,
        PositiveIntegerValidator,
        } = require('../../validator/validator')

const {NotFindException} = require("../../../core/http-exception")
const {Favor} = require('../../model/favor')
// 1.获取最新一起信息
router.get('/latest',new Auth().m,async (ctx,next)=>{
    // 通过order来用index进行倒序排列 拿到第一个
    const flow =await Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })
    const art = await Art.getArtData(flow.art_id,flow.type)
    const likeNext = await Favor.UserLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    // 将flow中的index属性放入art中 可以使用以下
    // 1. art.index = flow.index (此方法不行因为index要存在于art的data属性中)
    // 2. art.dataValue.index = flow.index (此方法可行 但是不好 过于滥用js动态的特性)
    // 3.sequelize的方法setDataValue 以下 与第二种效果相同
    art.setDataValue('index',flow.index)
    art.setDataValue('likeStatus',likeNext)
    ctx.body = art
})

// 2.获取下一期刊的详细信息
router.get("/:index/next",new Auth().m,async (ctx,next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where:{
            index:index+1
        }
    })

    if(!flow){
        throw new NotFindException('期刊没有了喔')
    }

    // 获取期刊详细信息
    const art =await Art.getArtData(flow.art_id,flow.type)
    // 获取是否点赞
    const likeNext =await Favor.UserLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index',flow.index);
    art.setDataValue('likeStatus',likeNext)
    ctx.body = art
})

// 3.获取上一期刊的详细信息
router.get("/:index/previous",new Auth().m,async (ctx,next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:"index"
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where:{
            index:index - 1
        }
    })

    if(!flow){
        throw new NotFindException('期刊没有了喔')
    }

    // 获取期刊详细信息
    const art =await Art.getArtData(flow.art_id,flow.type)
    // 获取是否点赞
    const likeNext =await Favor.UserLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index',flow.index);
    art.setDataValue('likeStatus',likeNext)
    ctx.body = art
})

// 4.获取用户所有喜欢期刊的列表
router.get("/favor",new Auth().m,async (ctx,next)=>{
    const arts = await Favor.getUserAllFavor(ctx.auth.uid)
    ctx.body = arts
})

// 5.获取某一期刊的点赞数量信息
router.get("/:id/:type/favor",new Auth().m, async (ctx,next)=>{
    const v = await new LikeValidator().validate(ctx)
    const art_id = v.get('path.id');
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art().getDetail(ctx.auth.uid,art_id,type)
    ctx.body = {
        fav_num: artDetail.art.fav_num,
        likeStatus: artDetail.likeStatus
      }
})



//6 获取某一期刊的详情信息
router.get("/:id/:type",new Auth().m, async (ctx,next)=>{
    const v = await new LikeValidator().validate(ctx)
    const art_id = v.get('path.id');
    const type = parseInt(v.get('path.type'))

    const artDetail = await new Art().getDetail(ctx.auth.uid,art_id,type)
    artDetail.art.setDataValue('likeStatus',artDetail.likeStatus)
    ctx.body = artDetail.art
})

module.exports = router