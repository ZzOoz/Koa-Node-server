const {Sequelize,Model} = require('sequelize')
const {
    dbname,
    user,
    password,
    port,
    host
} = require('../config/config').database
const {unset,clone,isArray} = require('lodash')
const sequelize = new Sequelize(dbname,user,password,{
    dialect:'mysql', // 表明使用mysql
    host,
    port,
    timezone: '+08:00',
    define:{
        timetamps:true,
        paranoid:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        deletedAt:"deleted_at",
        underscored:true,
        freezeTableName:true,
        // scopes: {
        //     // bh是过滤掉不必要的字段
        //     bh: {
        //       attributes: {
        //           //这些都会被过滤
        //         exclude: ['created_at', 'updated_at', 'deleted_at']
        //       }
        //     }
        //   },
    },

})

sequelize.sync({
    force:false// 每次更新不删除原来数据
})

// 在db文件下定义toJson方法过滤不必要的字段
Model.prototype.toJSON = function(){
    // 先复制一层浅拷贝数据到data 在修改 没必要深拷贝 因为只改一层数据
    let data = clone(this.dataValues)
    unset(data,'deleted_at')
    unset(data,'created_at')
    unset(data,'updated_at')
    
    for (key in data) {
        if (key === 'image') {
          console.log(!data[key].startsWith('https') && data[key] !== null)
          if (!data[key].startsWith('https') && data[key] !== null)
            data[key] = global.conf.host + data[key]
        }
      }
    return data
}
module.exports = {
    sequelize
}