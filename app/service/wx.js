const util = require('util')
const {ForbiddenException} = require("../../core/http-exception")
const axios = require("axios")
const {Auth} = require("../../middleware/auth")
const {generateToken} = require("../../core/util")
const {User} = require("../../app/model/user")
class WxMannager{
    constructor(){

    }

    static async codeToToken(code){
        const url = util.format(global.conf.wx.loginUrl,global.conf.wx.appId,global.conf.wx.appSecret,code)
        
        const result = await axios.get(url)

        if(result.status !== 200){
            throw new ForbiddenException('openId获取失败')
        }

        const errorcode = result.data.errcode
        const errmsg = result.data.errmsg
        if(errorcode && errorcode !== 0){
            throw new ForbiddenException("openId获取失败"+errmsg)
        }
        
        // 通过数据库查询判断用户是否登录过 仅仅是token失效
        let user = await User.getUserByOpenId(result.data.openid)
        if(!user){
            // 如果没有就直接创建数据
            user = await User.registerUserByOpenId(result.data.openid)
        }

        const token = generateToken(user.id,Auth.USER)
        return token
    }
}


module.exports = {
    WxMannager
}