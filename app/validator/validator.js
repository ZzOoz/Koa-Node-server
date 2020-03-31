const {LinValidator,Rule} = require('../../core/lin-validator-v2')
const {User} = require("../model/user")
// 引用loginType登录类型
const {LoginType,ArtType} = require('../lib/enum')
// 参数整数验证器
class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        // 对id进行校验
        this.id = [
            new Rule('isInt','参数必须是一个正整数',{min:1})
        ]
    }
}

// 用户注册参数校验规则（只有邮箱注册 小程序不需要）
class RegisterValidator extends LinValidator{
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
          ],
          this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
              min: 6,
              max: 32
            }),
            new Rule('matches', '密码不符合规范', "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$")
          ],
          this.password2 = this.password1,
          this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
              min: 4,
              max: 32
            }),
          ]
      }
        // 因为密码1和密码2必须相同，因此要定义校验两者是否相同的函数
        // 校验密码是否相同 vals接收所有的校验参数 email nickname 密码等
      validatePassword(vals) {
        const password1 = vals.body.password1
        const password2 = vals.body.password2
        if (password1 !== password2) {
          throw new Error('两个密码不一致')
        }
      }

      // 验证邮箱是否相同
      async validateEmail(vals){
        const email = vals.body.email;
        const user = await User.findOne({
            // 查询数据库中是否有相同的邮箱
            where:{
                // 第一个为数据库字段名 第二个为vals.body.email
                email:email
            }
        })

        if(user){
            throw new Error('邮箱相同')
        }
      }
}

//用户登录取得令牌验证其
class TokenValidator extends LinValidator{
  constructor() {
    super()
    this.account = [
      new Rule('isLength','用户长度不合适',{
        min:6,
        max:32
      })
    ]

    this.secret = [
      new Rule('isOptional'), // 表明字段可传可不传 如果传了必须遵守下面规则
      new Rule('isLength','密码不符合规则',{
        min:6,
        max:32
      })
    ]
  }

  // 定义登录类型的校验方法
  validateLoginType(vals){
    // 如果登录类型没有定义
    if(!vals.body.type){
      throw new Error('登录类型必须确认')
    }
    // 如果登录的类型中不存在枚举文件中
    if(!LoginType.isThisType(vals.body.type)){
      throw new Error('不存在这种登录方式,请正确输入')
    }
  }
}


// 定义不能为空的验证器
class NotEmptyValidator extends LinValidator{
  constructor() {
    super()
    this.token = [
      new Rule('isLength','长度不合适',{
        min:1,
      })
    ]
  }
}

// 点赞验证其
class LikeValidator extends PositiveIntegerValidator{
  constructor(){
    super()
    // 验证函数必须是以validate开头不然无法验证
    this.validateType = checkArtType
  }
}

// 搜索验证关键词验证其
class SearchValidator extends LinValidator{
  constructor(){
    super()
    this.q = [
      new Rule('isLength', '搜索关键词不能为空', {
        min: 1,
        max: 16
      })
    ]
    this.start = [
      new Rule('isInt', '不符合规范', {
        min: 0,
        max: 60000
      }),
      new Rule('isOptional', '', 0)
    ],
    this.count = [
      new Rule('isInt', '不符合规范', {
        min: 1,
        max: 20
      }),
      new Rule('isOptional', '', 20)
    ]
  }
}

// 添加短评验证器
class ShortCommentValidator extends PositiveIntegerValidator{
  constructor(){
    super()
    this.content = [
      new Rule('isLength','短评内容不能超过12个字',{
        min:1,
        max:12
      })
    ]
  }
} 


// 在这里定义checkType方法验证类型 
function checkType(vals){
      let type = vals.body.type || vals.path.type
      // 如果登录类型没有定义
      if(!type){
        throw new Error('登录类型必须确认')
      }
      // 做一次转型
      type = parseInt(type)
      // 如果登录的类型中不存在枚举文件中
      if(!LoginType.isThisType(type)){
        throw new Error('不存在这种登录方式,请正确输入')
      }
}

// 在这里定义checkType方法验证类型 (ArtType)
function checkArtType(vals){
  let type = vals.body.type || vals.path.type
  // 如果登录类型没有定义
  if(!type){
    throw new Error('登录类型必须确认')
  }
  // 做一次转型
  type = parseInt(type)
  // 如果登录的类型中不存在枚举文件中
  if(!ArtType.isThisType(type)){
    throw new Error('不存在这种登录方式,请正确输入')
  }
}
module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    LikeValidator,
    TokenValidator,
    SearchValidator,
    NotEmptyValidator,
    ShortCommentValidator
}