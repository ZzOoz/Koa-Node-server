require('module-alias/register')

const path = require('path')
const Koa = require('koa')
const static = require("koa-static")
// 使用koa-bodyparser获取body参数
const parser = require('koa-bodyparser')
const initManager = require('@core/init')
const catchError = require('@middleware/exception')
require('@model/user')
require('@model/classic')
require('@model/flow')
require("@model/hotBook")
require("@model/book")
require("@model/bookcomment")

const app = new Koa()

app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname,'static')))
// 将app传入初始化路由等参数
initManager.initCore(app)

app.listen(3000,()=>{
    console.log('程序已启动')
})