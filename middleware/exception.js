const {HttpException} = require('../core/http-exception')
// 全局异常中间件 用来捕捉异常处理
// 全局异常处理本质是一个中间件，使用es7
const catchError = async (ctx,next) => {
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = global.conf.environment === 'dev'
        // 如果是开发环境且error不是HttpException(已知错误) 那么抛出错误
        if(isDev && !isHttpException){
            throw error
        }
        
        // 如果是生产环境
        // 判断error是不是HttpException类型错误
        // 如果是则是已知错误 因为HttpException是自己定义的错误类
        // 抛出的错误 如在某一个api抛出ParameterException错误 就会被最外面的catchError捕捉
        // 然后因为是HttpException类型所以会报错下面ctx.body的错误
        if(isHttpException){
            ctx.body = {
                msg:error.msg,
                error_code:error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
        // 处理未知异常
        else{
            ctx.body = {
                msg:'这是一个未知异常',
                error_code:9999999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError
