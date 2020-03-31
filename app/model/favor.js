// 这里是存放业务的业务表 期刊的业务信息
const {sequelize} = require('../../core/db')
const {Sequelize,Model,Op} = require('sequelize')
class Favor extends Model{
    // 用户点赞封装方法
    static async like(art_id,type,uid){
        // 首先要查询是否已经有点赞过了
        const {Art} = require('./art.js')
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        
        // 如果存在
        if(favor){
            throw new global.errs.LikeErrorException()
        }

        // 如果没有点过赞那么就要在数据库中加入
        // 这里要使用数据库的事务 （要不同时成功，有一个失败都全部撤销）
        // 保证数据一致性(记得事务一定要return返回 不然没有数据出来)
        return sequelize.transaction(async t=>{ // 后面如果还没有点赞则加入数据库事务  事务必须返回不然无法在数据库显示
            await Favor.create({ // 创建一个点赞的用户（因为他还没有点赞）
                art_id,
                type,
                uid
            },{transaction:t}) // 事务后面要加如transaction：t
            const art = await Art.getArtData(art_id,type) // 获取Art中的期刊
            await art.increment('fav_num',{by:1,transaction:t}) // 将期刊中的喜欢数量加1
        })
    }

    //用户取消点赞
    static async dislike(art_id,type,uid){
        const {Art} = require('./art.js')

        // 首先要查询是否已经有点赞过了
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        
        // 如果存在
        if(!favor){
            throw new global.errs.DisLikeErrorException()
        }

        // 要对数据本身进行destory 不是在Favor
        return sequelize.transaction(async t=>{ 
            await favor.destroy({ 
                force:true,
                transaction:t
            }) // 事务后面要加如transaction：t
            const art = await Art.getArtData(art_id,type) // 获取Art中的期刊
            await art.decrement('fav_num',{by:1,transaction:t}) // 将期刊中的喜欢数量加1
        })
    }

    
    // 获取用户是否喜欢这个期刊的信息
    static async UserLikeIt(art_id,type,uid){
        let isFavor =await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })

        return isFavor? 1:0
    }

    // 根据用户id获取多个art
    static async getUserAllFavor(uid){
        const {Art} = require('./art')  
        const arts =await Favor.findAll({
            where:{
                // 寻找符合的uid，并且type不是400的用户喜欢的期刊
                // 400指的是书籍 并不是期刊类型的 因此需要排除
                uid,
                type:{
                    [Op.not]:400
                }
            }
        })

        if(!arts){
            throw new global.errs.NotFindException()
        }

        return await Art.getFavorArtData(arts)
    }
}

Favor.init({
    uid:Sequelize.INTEGER, // 用户的id
    art_id:Sequelize.INTEGER, // 对于其他实体的id 通过这个id 可以找到相关实体的信息 外键 实体的类型 假如100为music 加上artid可以精准定位到哪一个实体
    type:Sequelize.INTEGER // 期刊号
},{
    sequelize,
    tableName:'favor'
})

module.exports = {
    Favor
}