/*
 node server.js でnode socket server を起動する
*/

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

//const mongoStaffSche = require('./mongoStaffSche.js')
const mongoAsync = require('../mongoAsync.js');
const MONGOINFO = require('../config.js').MONGOINFO;
const filterAnalisys = require('../filterAnalisys.js')
console.log(MONGOINFO)


  



/**
 * mongo read specific number with socket.emit
 * 
 * @param {*} num 
 * @param {*} socket 
 */
function readLimit(num, socket, collectionName){
    const db = MONGOINFO.db1.name;
    const col = collectionName
    mongoAsync.readLimit(db, col, num, socket);
}
/**
 * mongoEvent exports
 * 
 * @param {obj} socket 
 */
function memoEvent(socket){
    /**
     * read limit
     */
    socket.on('READLIMIT', (obj) => {
        readLimit(obj.num, socket, obj.col)
    });
    /**
     * 
     */
    socket.on('UPSERT_ONE', (obj) => {
        const db = MONGOINFO.db1.name;
        const col = obj.col
        mongoAsync.upsertOne(db, col, socket, obj.d);
    });
    /**
     * add new memo
     * 
     * after write, emit _id
     */
    socket.on('ADD_NEW_ONE', (obj) => {
        console.log('add-new-one', obj.d)
        console.log(obj.col, typeof(obj.col))
        console.log('obj-', obj)
        const db = MONGOINFO.db1.name;
        const col = obj.col
        mongoAsync.addNewOne(db, col, socket, obj.d);
    });
    /**
     * detete one memo by id
     */
    socket.on('DELETE_ONE', (obj) => {
        console.log('delete_one', obj.id)
        const db = MONGOINFO.db1.name;
        const col = obj.col
        mongoAsync.deleteOne(db, col, socket, obj.id);
    });
    /**
     * filter string
     * 
     * param : {filter: filter-string, num: read_size}
     */
    socket.on('FILTER_STRING', (obj) => {
        //console.log(param);
        const db = MONGOINFO.db1.name;
        const col = obj.col
        if(obj.filter === ''){
            readLimit(obj.num, socket, obj.col)
        }else if(filterAnalisys.checkDate(obj.filter)){
            console.log('date string')
            mongoAsync.filterFromDate(db, col, obj, socket)
        }else{
            mongoAsync.filteredRead(db, col, obj, socket);
        }
    });
};
/**
 * socket main
 */
io.on("connection", (socket) => {
    console.log('coonnect')
    socket.on('TEST', () => {
      console.log('com-TEST recieve')
    })
    memoEvent(socket)
})

module.exports = memoEvent;



//test
/*
console.log('test-on')
const date = { year: 2023, month: 8, date: 3, day: '木' }
const socket = {}
mongoStaffSche.readStaffSche(date, socket)
*/
httpServer.listen(5150);

console.log('\nnode-server running ..... port 5150\n')

