class HttpException extends Error{
    constructor(msg="服务内部发生错误",errorCode=10000,code=400){
        super()
        this.msg = msg;
        this.errorCode = errorCode, // errorCode是自己定义的更加详细的错误码
        this.code = code // code就是服务返回的错误码
    }
}

// 参数错误异常处理
class ParameterException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || '您的参数错误';
        this.errorCode = errorCode || 10000, // errorCode是自己定义的更加详细的错误码
        this.code = 400 // code就是服务返回的错误码
    }
}

//成功异常
class Success extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || '成功';
        this.errorCode = errorCode || 1201, // errorCode是自己定义的更加详细的错误码
        this.code = 201 // code就是服务返回的错误码
    }
}


// 没有找到用户的异常
class NotFindException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || '没有找到该用户';
        this.errorCode = errorCode || 1404, // errorCode是自己定义的更加详细的错误码
        this.code = 404 // code就是服务返回的错误码
    }
}

class AuthFaildException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || '授权失败';
        this.errorCode = errorCode || 1401, // errorCode是自己定义的更加详细的错误码
        this.code = 401 // code就是服务返回的错误码
    }
}

// 不合法异常
class ForbiddenException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || '禁止访问';
        this.errorCode = errorCode || 1403, // errorCode是自己定义的更加详细的错误码
        this.code = 403 // code就是服务返回的错误码
    }
}

class LikeErrorException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || '你已经点过赞了';
        this.errorCode = errorCode || 1400, // errorCode是自己定义的更加详细的错误码
        this.code = 400 // code就是服务返回的错误码
    }
}

class DisLikeErrorException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || '你已经取消点赞了';
        this.errorCode = errorCode || 1400, // errorCode是自己定义的更加详细的错误码
        this.code = 400 // code就是服务返回的错误码
    }
}


module.exports = {
    ForbiddenException,
    HttpException,
    Success,
    ParameterException,
    NotFindException,
    AuthFaildException,
    LikeErrorException,
    DisLikeErrorException
}