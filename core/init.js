 // requireDirectory是自动注册所有路由的npm包
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class initManager{
    // initCore为入口方法 
    static initCore(app){
        // 将app存到类中
        initManager.app = app
        //入口方法先要注册所有路由
        initManager.initLoadRoutes()
        // 入口方法加载所有的已知异常类型
        initManager.initHttpException()
        // 加载所有config文件
        initManager.initConfig()
    }
    static initLoadRoutes(){
        // 使用绝对路径尽量避免将死路径写在requireDirectory中
        const apiDirectory = `${process.cwd()}/app/api`
        // 调用requireDirectory获取目录下的路由 v1 v2都能获取
        requireDirectory(module,apiDirectory,{visit:whenLoadModule})

        // 每次使用requireDirectory加载路由的时候会调用这个方法
        function whenLoadModule(obj){
            // 判断这个加入的obj是否为Router类型
            // 如果是则注册路由
            if(obj instanceof Router){
                initManager.app.use(obj.routes())
            }
        }
    }

    static initHttpException(){
        const errors = require('./http-exception') // 拿到所有的错误类型
        global.errs = errors // 赋值给全局变量
    }

    static initConfig(path=''){
        const loadconfig = path || process.cwd() + '/config/config.js'
        const config = require(loadconfig)
        global.conf = config
    }
}

module.exports = initManager