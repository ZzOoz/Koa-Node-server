// 这里是存放业务的业务表 期刊的业务信息
const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')

class Flow extends Model{

}

Flow.init({
    type:Sequelize.INTEGER, // 实体的类型 假如100为music 加上artid可以精准定位到哪一个实体
    art_id:Sequelize.INTEGER, // 对于其他实体的id 通过这个id 可以找到相关实体的信息 外键
    index:Sequelize.INTEGER // 期刊号
},{
    sequelize,
    tableName:'flow'
})

module.exports = {
    Flow
}