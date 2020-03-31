// Movie 100 Music 200 Stence 300
const { Movie, Sentence, Music } = require('./classic')
const { Favor } = require('./favor')
const { Op } = require('sequelize')
const { flatten } = require('lodash')
class Art {
  constructor(art_id, type) {
    this.art_id = art_id;
    this.type = type
  }
  // 获取详细信息
  async getDetail(uid, art_id, type) {
    const art = await Art.getArtData(art_id, type)
    if (!art) {
      throw new global.errs.NotFindException()
    }

    const likeNext = await Favor.UserLikeIt(art_id, type, uid)

    return {
      art: art,
      likeStatus: likeNext
    }
  }

  // 获取art的信息
  static async getArtData(art_id, type, useScope = true) {
    const finder = {
      where: {
        id: art_id
      }
    }
    const scope = useScope ? 'bh' : null
    let art = null
    switch (type) {
      case 100:
        art = await Movie.findOne(finder)
        break
      case 200:
        art = await Music.findOne(finder)
        break
      case 300:
        art = await Sentence.findOne(finder)
        break
      case 400:
        const { Book } = require('./book')
        art = await Book.findOne(finder)
        if (!art) {
          art = await Book.create({
            id:art_id
          })
        }
        console.log(art)
        break
      default:
        break
    }
    return art
  }

  // 获取喜欢期刊多个数组
  static async getFavorArtData(artsInfoList) {
    let FavorObj = {
      // 将多个类型期刊分为多个空数组
      // 以便循环插入
      100: [],
      200: [],
      300: []
    }

    for (const artInfo of artsInfoList) {
      FavorObj[artInfo.type].push(artInfo.art_id)
    }

    const arts = []
    for (let key in FavorObj) {
      let ids = FavorObj[key]
      if (ids.length === 0) {
        continue
      }
      // 将key转化成数字 因为对象上面的key是字符串
      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }
    return flatten(arts)
  }

  // 通过id号和type来用in一次查询所有喜欢的期刊
  static async _getListByType(ids, type) {
    let arts = []
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }

    const scope = 'bh'
    switch (type) {
      case 100:
        arts = await Movie.findAll(finder)
        break
      case 200:
        arts = await Music.findAll(finder)
        break
      case 300:
        arts = await Sentence.findAll(finder)
        break
      case 400:
        break
      default:
        break
    }
    return arts
  }
}

module.exports = {
  Art
}