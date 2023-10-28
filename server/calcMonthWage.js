/**
 * 
 * 月給与の計算
 * 
 * 時給 x 時間
 * 日給 x 日数
 * 
 */
const moment = require('moment');
//test
function test(){
    var startTime = '2016-02-21 08:00';
    var endTime = '2016-02-21 19:30';
    var hours = moment
            .duration(moment(endTime, 'YYYY/MM/DD HH:mm')
            .diff(moment(startTime, 'YYYY/MM/DD HH:mm'))
            ).asHours();
    console.log(hours); // 1.5
}




/**
 * 時間計算
 * 
 * @param {*} sche 
 */
function getHour(sche){
    //test()
    let sum = 0
    sche.forEach((s) => {
        let diff = moment.duration(moment(s.aEditOut,'HH:mm').diff(moment(s.aEditIn,'HH:mm'))).asHours();
        if(isNaN(diff)){
            diff = 0
        }else{
            if(typeof(diff) === String){
                diff = parseInt(diff)
            }
            //type名はnumberでない？？
            /*
            if(typeof(diff) !== number ){
                diff = 0
            }*/
        }
        sum += diff
    })
    return sum
}
/**
 * 日給計算
 * 
 * sche.aEditIn or sche.aEditOutのどちらかにデータがある場合、出勤日とみなす。
 * 単にsche.lengthで計測できる？
 * 
 */
function getDay(sche){
    return sche.length
}
/**
 * 
 * @param {*} payType 
 * @param {*} wage 
 * @param {*} sche 
 */
/**
 * 
 * { date: '1', aEditIn: '11:00', aEditOut: '16:00', aEditMemo: null }
 */
function calcMonthWageOne(payType, wage, sche){
    let salary = 0
    let sumHour = 0.0
    if(payType === '時給'){
        //console.log('h, price', getHour(sche), parseInt(wage))
        //console.log('type-h, type-price',typeof(getHour(sche)), typeof(parseInt(wage)))
        sumHour = getHour(sche)
        salary = sumHour * parseInt(wage)
    }else if(payType === '日給'){
        //console.log('type=day’s sche', sche)
        sumHour = getDay(sche)
        salary = sumHour * parseInt(wage)
    }else if(payType === '月給'){
        sumHour = 1
        salary = 1 * parseInt(wage)
    }
    // sum workload
    /*
    sche.forEach((s) => {
        salary
        console.log(s)
        
    })*/
    //console.log(salary)
    //小数点以下は切り捨て
    return {time: sumHour, wage:parseInt(salary)}
}

/**
 * 
 */
var calcMonthWage = {
    calcMonthWage: (payType, wage, sche) => {
        //console.log(payType, wage, sche)
        const month_wage = calcMonthWageOne(payType, wage, sche)
        return month_wage
    }
}



module.exports = calcMonthWage;