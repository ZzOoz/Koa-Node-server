// 这里定义的是classic类 里面包含了music\sentence\movie等多种类型的期刊
const util = require("util")
const axios = require("axios")
const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')
const {Favor} = require('./favor')
class Book extends Model{
    constructor(){
        super()
    }

    async getBookDeatil(id){
        const url = util.format(global.conf.yushu.detailUrl,id)
        const detail = await axios.get(url)
        return detail.data
    }

    // 搜索书籍获取书籍列表
    static async SearchBookList(q,count,start,summary=1){
        const url = util.format(
            global.conf.yushu.keywordUrl, encodeURI(q), count, start, summary)
          const result = await axios.get(url)
          return result.data
    }

    // 获取喜欢书籍的数量
    static async getFavorBookNum(uid){
        const result = await Favor.count({
            where:{
                uid,
                type:400
            }
        })
        return result
    }

    // 获取书籍点赞情况
    static async getFavorBookInfo(uid,bookId){
        // 通过bookId统计出Favor中有多少条记录
        const favorNum = await Favor.count({
            where:{
                art_id:bookId
            }
        })

        // 通过uid，type，bookID查找唯一一条数据 如果有那么就证明点赞了
        const likeStatus = await Favor.findOne({
            where:{
                art_id:bookId,
                uid,
                type:400
            }
        })

        return {
            count:favorNum,
            likeStatus:likeStatus ? 1 : 0
        }
    }
}

Book.init({
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    fav_num:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'book'
  })


module.exports = {
    Book
}