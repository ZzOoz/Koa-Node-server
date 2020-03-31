module.exports = {
    environment:'dev',
    // 数据库的信息
    database:{
        dbname:'israin',
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456'
    },
    token:{
        secretKey:'abcdefghij',
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'wxa24cca0664e4203e',
        appSecret:'2867ba4ddc6fab5164700d2264204280',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrlMovie:"http://api.douban.com/v2/movie/subject/id/%s",
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
      },
    host: 'https://'
}