const monthList = '一,二,三,四,五,六,七,八,九,十,十一,十二'.split(',');
// value的值为三，六，十二
const ACTIVE_VALUE = ['三','六','十二'].reduce((cache,value)=>{
    // 如果cahce的长度为零那么先变为1,否则加1
	let i = cache.length > 0 ? cache[cache.length - 1].value + 1 : 1
    // 寻找value出现在monthList的下标3，6，12
    return cache.concat(monthList.slice(0,monthList.indexOf(value)+1).map(item => ({
            // item 根据slice选中的结果 如三个月的有 一，二，三
            label:`近${value}个月内活跃${item}个月`,
            value: i++ // 会根据长度直接加
    })))
},[])


console.log(ACTIVE_VALUE)