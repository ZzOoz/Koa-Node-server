const basicAuth = require('basic-auth')
const jwt = require("jsonwebtoken")
class Auth{
    constructor(level){
        this.level = level;
        Auth.USER = 8;
        Auth.ADMIN = 16;
        Auth.SUPER_ADMIN = 32
    }

    // 定义一个属性
    get m(){
        // 返回一个函数（中间件）
        return async (ctx,next)=>{
            // ctx.req 是获取node.js原生的封装的request对象
            // ctx.request获取的是koa封装nodejs的request对象
            // 从给定的请求中获取基本的身份验证凭据。 
            //解析Authorization标头，如果标头无效，则返回undefined，
            //否则返回具有name和pass属性的对象。
            const userToken = basicAuth(ctx.req)
            let errorMsg = 'token不合法'

            if(!userToken || !userToken.name){
                throw new global.errs.ForbiddenException(errorMsg)
            }

            try {
                // 使用jsonwebtoken来验证token的合法型
                // 第一个参数是token 第二个是secretKey
                // 解析出来的decodeToken有生成token时候的uid和scope权限
                var decodeToken = jwt.verify(userToken.name,global.conf.token.secretKey)
                console.log(decodeToken)
            } catch (error) {
                // 如果出现异常 1.token过期 2.不合法
                // 过期
                if(error.name === 'TokenExpiredError'){
                    errorMsg = 'token过期了'
                }
                throw new global.errs.ForbiddenException(errorMsg)
            }
            
            // 通过实例传参来比较权限级别
            if(decodeToken.scope <= this.level){
                errorMsg = '权限不足'
                throw new global.errs.ForbiddenException(errorMsg)
            }

            // 通过解密的decodeToken来获取之前放进token的信息
            ctx.auth = {
                uid:decodeToken.uid,
                scope:decodeToken.scope
            }

            await next()
        }
    }

    // 新增一个方法验证token的合法性
    static verifyToken(token){
        try {
            jwt.verify(token,global.conf.token.secretKey)
            return true
        } catch (error) {
            return false            
        }
    }
}

module.exports = {
    Auth
}