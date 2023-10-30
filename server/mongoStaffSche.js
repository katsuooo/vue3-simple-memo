/*
スタッフスケジュールの調整
*/
var mongodb = require('mongodb');
//const MONGOINFO = require('./config').MONGOINFO;
const calcMonthWage = require('./calcMonthWage.js')
const dayjs = require('dayjs')


const MONGOINFO = {
    url: 'mongodb://localhost',
}
/*

staff-scheのリード
当日のスタッフシフト希望、決定シフトのデータを読み込む

*/
var readStaffSche = async(appDate, socket) => {
    console.log('staff-day-sche', appDate)
    const dbName = 'shushu'
    const colName = 'ms_' + appDate.year.toString() + appDate.month.toString().padStart(2,'0')
    const eventName = 'STAFF_DAYSCHE_RESULT'
    var client;
    try{
        client = await mongodb.MongoClient.connect(MONGOINFO.url, {useUnifiedTopology: true} );
        const db = await client.db(dbName);
        const collection = await db.collection(colName);
        let d = await collection.find({day:appDate.date.toString()}).toArray();
        console.log(dbName, colName, appDate.date)
        console.log('read-mongo', d[0].sches)
        if(d[0].sches){
            var today = true
        }else{
            var today = false
        }
        console.log('today-data-exist', today)
        if(today === false){
            console.log('today is nodata:')
            socket.emit(eventName, {});
        }else{
            socket.emit(eventName, d[0]);
        }
    }catch(err){
        console.log(err);
    }finally{
        try{
            console.log('member-sche-read-pass')
            client.close();
        }catch(err){
            console.log(err)
        }
    }

}


const mongoStaffSche = {
    readStaffSche: (appDate, socket) => {
        console.log('appDate', appDate)
        readStaffSche(appDate, socket)
    }
}
module.exports = mongoStaffSche