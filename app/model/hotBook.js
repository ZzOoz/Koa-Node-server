// 这里是存放业务的业务表 期刊的业务信息
const {sequelize} = require('../../core/db')
const {Sequelize,Model,Op} = require('sequelize')
const {Favor} = require('./favor')
class HotBook extends Model{
    // 查询数据库获取热门书籍方法
    static async getAll() {
        const books = await HotBook.findAll({
          order: ['index']
        })
    
        const ids = books.map(book => book.id)
        const favors = await Favor.findAll({
          where: {
            art_id: {
              [Op.in]: ids
            },
            type: 400
          },
          group: ['art_id'],
          attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
    
        books.forEach(book => {
          HotBook._getEachBookStatus(book, favors)
        })
    
        return books
      }
    
      static _getEachBookStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
          if (favor.art_id === book.id) {
            count = favor.get('count')
          }
        })
        book.setDataValue('fav_num', count)
        return book
      }
      

      // 使用toJson方法在数据序列化的时候过滤掉不需要的字段（这是一种方法也可以直接在model上面定义toJson）
      // toJSON(){
      //   return {
      //     index:this.getDataValue('index'),
      //     image:this.getDataValue('image'),
      //     author:this.getDataValue('author'),
      //     title:this.getDataValue('title'),
      //     favNums:this.getDataValue('favNums')
      //   }
      // }
}

HotBook.init({
    index:Sequelize.INTEGER,
    image:Sequelize.STRING, 
    author:Sequelize.STRING,
    title:Sequelize.STRING,
},{
    sequelize,
    tableName:'hotbook'
})

module.exports = {
    HotBook
}