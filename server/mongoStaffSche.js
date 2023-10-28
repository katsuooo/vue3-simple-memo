/*
スタッフスケジュールの調整
*/
var mongodb = require('mongodb');
//const MONGOINFO = require('../config/config').MONGOINFO;
const calcMonthWage = require('./calcMonthWage.js')
const dayjs = require('dayjs')

/*


appDate: { year: 2023, month: 9, date: 7, day: '木' }

ms_yyyymmdd:
{
  "_id": {
    "$oid": "64f30d5fb7a3ccb5c6f2a1f2"
  },
  "day": "2",
  "sches": [
    {
      "name": "栗岡さやか",
      "stime": "",
      "etime": "",
      "desired_stime": "",
      "desired_etime": "",
      "place": "シュシュ",
      "holiday": false,
      "desired_holiday": true
    }
  ]
}
*/

/*
var readAttendance = async(dbName, colName, appDate, name, socket, eventName) => {
    console.log('read-attendance')
    var client;
    try{
        client = await mongodb.MongoClient.connect(MONGOINFO.url, {useNewUrlParser:true}, {useUnifiedTopology: true} );
        const db = await client.db(dbName);
        const collection = await db.collection(colName);
        let d = await collection.find({date:appDate.date}).toArray();
        console.log('attendance',d)
        if(d.length === 0){
            var today = false
        }else{
            var today = getTodayAttendance(d, appDate.date)
        }
        console.log('today', today)
        if(today === false){
            socket.emit(eventName, {name:name, in:'', out:''});
        }else{
            const attendance = parseAttendance(today, name)
            console.log('att-', name, attendance)
            socket.emit(eventName, attendance);
        }
    }catch(err){
        console.log(err);
    }finally{
        try{
            console.log('attendance-read-pass')
            client.close();
        }catch(err){
            console.log(err)
        }
    }
}


    const colName = 'attend_' + appDate.year.toString() + appDate.month.toString().padStart(2,'0');
    readAttendance('shushu', colName, appDate, name, socket, 'READ_ATTENDANCE_RESULT')
*/

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
        client = await mongodb.MongoClient.connect(MONGOINFO.url, {useNewUrlParser:true}, {useUnifiedTopology: true} );
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