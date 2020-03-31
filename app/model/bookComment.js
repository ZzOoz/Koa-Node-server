// 这里是存放业务的业务表 期刊的业务信息
const {sequelize} = require('@core/db')
const {Sequelize,Model,Op} = require('sequelize')
const {Favor} = require('./favor')
class Comment extends Model{

    // 添加短评
    static async addComment(book_Id, content) {
        const comment = await Comment.findOne({
          where: {
            book_Id,
            content
          }
        })
        if (!comment) {
          return await Comment.create({
            book_Id,
            content,
            num: 1
          })
        } else {
          return await comment.increment('num', {
            by: 1
          })
        }
    }

    // 获取短评
    static async getComment(book_Id){
        const comment = await Comment.findAll({
            where:{
                book_Id
            }
        })
        return comment
    }
}

Comment.init({
    book_Id:Sequelize.INTEGER,
    content:Sequelize.STRING, 
    num:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'comment'
})

module.exports = {
    Comment
}