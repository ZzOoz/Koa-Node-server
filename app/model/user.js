const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')
const bscrypt = require('bcryptjs')
const {NotFindException,AuthFaildException} = require('../../core/http-exception')
class User extends Model{
    // 在user模型上面定义验证email和密码的方法
    static async verifiyEamilandPassword(email,plainPassword){
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        // 如果没有找到这个邮箱的用户就直接抛出异常 如果有就下一步
        if(!user){
            throw new NotFindException('账号不存在')
        }

        // 用解密的密码和用户输入的密码做对比
        const correct = bscrypt.compareSync(plainPassword,user.password)
        if(!correct){
            throw new AuthFaildException('密码不正确')
        }
        // 返回这个用户
        return user
    }

    // 查询用户是否曾在此小程序登录过
    static async getUserByOpenId(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user
    }

    // 通过openId创建用户的数据
    static async registerUserByOpenId(openid){
        const user = await User.create({
            openid
        })
        return user
    }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        // 设置成主键
        primaryKey:true,
        autoIncrement:true
    },
    password:{
        type:Sequelize.STRING,
        set(val){
            const salt = bscrypt.genSaltSync(10) // 获取加密盐
            const psw = bscrypt.hashSync(val,salt) // 通过盐加密密码
            this.setDataValue('password',psw)
        }
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    openid:{
        type:Sequelize.STRING(), // 设置长度
        // 设置成唯一
        unique:true
    }
},{
    sequelize,
    tableName:'user'
})

module.exports = {
    User
}