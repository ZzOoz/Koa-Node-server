const Router = require('koa-router')
const router = new Router({
    prefix:"/v1/book"
})
const {PositiveIntegerValidator,SearchValidator,ShortCommentValidator} = require("../../validator/validator")
const {HotBook} = require('../../model/hotBook')
const {Book} = require('../../model/book')
const {Auth} = require('../../../middleware/auth')
const {success} = require("../../lib/helper")
const {Comment} = require('../../model/bookComment')
// 获取热门书籍详情
router.get('/',async (ctx,next)=>{   
    const hotbook = await HotBook.getAll()
    ctx.body = {
        hotbook
    }
})

// 获取书籍详情
router.get('/:id/detail',async (ctx,next)=>{   
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = await new Book().getBookDeatil(v.get('path.id'))
    ctx.body = book
})


// 搜索书籍
router.get('/search',async (ctx,next)=>{   
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.SearchBookList(
                    v.get('query.q'),
                    v.get('query.count'),
                    v.get('query.start'))
    ctx.body = result
})

// 获取喜欢书籍的数量
router.get('/favor/count',new Auth().m,async (ctx,next)=>{   
    const count = await Book.getFavorBookNum(ctx.auth.uid)
    ctx.body = {
        count
    }
    
})

// 获取书籍点赞情况
router.get('/:book_id/favor',new Auth().m,async (ctx,next)=>{   
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:"book_id"
    })
    const favorInfo = await Book.getFavorBookInfo(ctx.auth.uid,v.get('path.book_id'))
    ctx.body = favorInfo
})

// 新增短评
router.post('/add/short_comment',new Auth().m,async (ctx,next)=>{   
    const v = await new ShortCommentValidator().validate(ctx,{
        id:"book_Id"
    })
    const data = await Comment.addComment(v.get('body.book_Id'),v.get('body.content'))
    success()
})

// 获取短评
router.get('/:book_Id/short_comment',new Auth().m,async (ctx,next)=>{   
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:"book_Id"
    })
    const book_id = v.get('path.book_Id')
    const comment = await Comment.getComment(book_id)   
    ctx.body = {
        comment,
        book_id
    }
})

module.exports = router