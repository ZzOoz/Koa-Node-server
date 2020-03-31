// 这里定义的是classic类 里面包含了music\sentence\movie等多种类型的期刊

const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')

const classFields = {
    image:Sequelize.STRING,
    title:Sequelize.STRING,
    fav_num:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    content:Sequelize.STRING,
    type:Sequelize.INTEGER,
}

class Movie extends Model{
    
}

Movie.init(classFields,{
    sequelize,
    tableName:'movie'
})

class Sentence extends Model{
    
}

Sentence.init(classFields,{
    sequelize,
    tableName:'sentence'
})

class Music extends Model{
    
}

const musicFields = Object.assign({
    url:Sequelize.STRING
},classFields)

Music.init(musicFields,{
    sequelize,
    tableName:'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}