function isThisType(val){
    for (const key in this) {
        if(this[key] === val){
            return true
        }    
    }
    return false
}
const LoginType = {
    USER_MINI_PROGRAM: 100, //小程序
    USER_EMAIL: 101, //email
    USER_MOBILE: 102, // 手机
    ADMIN_EMAIL: 200,
    isThisType
}

const ArtType = {
    MOVIE:100,
    MUSIC:200,
    STENCE:300,
    BOOK:400,
    isThisType
}

module.exports = {
    LoginType,
    ArtType
}