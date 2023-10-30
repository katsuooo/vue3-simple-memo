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
const mongoAsync = require('./mongoAsync.js');
const MONGOINFO = require('./config.js').MONGOINFO;
const filterAnalisys = require('./filterAnalisys.js')
console.log(MONGOINFO)

io.on("connection", (socket) => {
  console.log('server-connect')
  socket.on('TEST', () => {
    console.log('com-TEST recieve')
  })
  socket.on('READ_STAFF_SCHE', (date) => {
    if (date === null){
      return
    }
    console.log('read-staff-sche', date)
    mongoStaffSche.readStaffSche(date, socket)
  })
  socket.on( 'READLIMIT', (num) => {
    readLimit(num, socket)
  });
  /**
   * 
   */
  socket.on('UPSERT_ONE', (memo) => {
    const db = MONGOINFO.db1.name;
    const col = MONGOINFO.db1.collection.memo;
    mongoAsync.upsertOne(db, col, socket, memo);
  });
  /**
  * add new memo
  * 
  * after write, emit _id
  */
  socket.on('ADD_NEW_ONE', (memo) => {
    console.log('add-new-one', memo)
    const db = MONGOINFO.db1.name;
    const col = MONGOINFO.db1.collection.memo;
    mongoAsync.addNewOne(db, col, socket, memo);
  });
  /**
  * detete one memo by id
  */
  socket.on('DELETE_ONE', (id) => {
    console.log('delete_one', id)
    const db = MONGOINFO.db1.name;
    const col = MONGOINFO.db1.collection.memo;
    mongoAsync.deleteOne(db, col, socket, id);
  });
/**
 * filter string
 * 
 * param : {filter: filter-string, num: read_size}
 */
socket.on('FILTER_STRING', (param) => {
    //console.log(param);
    const db = MONGOINFO.db1.name;
    const col = MONGOINFO.db1.collection.memo;
    if(param.filter === ''){
        readLimit(param.num, socket)
    }else if(filterAnalisys.checkDate(param.filter)){
        console.log('date string')
        mongoAsync.filterFromDate(db, col, param, socket)
    }else{
        mongoAsync.filteredRead(db, col, param, socket);
    }
});
  /*
*/


/**
 * mongo read specific number with socket.emit
 * 
 * @param {*} num 
 * @param {*} socket 
 */
function readLimit(num, socket){
    const db = MONGOINFO.db1.name;
    const col = MONGOINFO.db1.collection.memo;
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
    socket.on( 'READLIMIT', (num) => {
        readLimit(num, socket)
    });
    /**
     * 
     */
    socket.on('UPSERT_ONE', (memo) => {
        const db = MONGOINFO.db1.name;
        const col = MONGOINFO.db1.collection.memo;
        mongoAsync.upsertOne(db, col, socket, memo);
    });
    /**
     * add new memo
     * 
     * after write, emit _id
     */
    socket.on('ADD_NEW_ONE', (memo) => {
        console.log('add-new-one', memo)
        const db = MONGOINFO.db1.name;
        const col = MONGOINFO.db1.collection.memo;
        mongoAsync.addNewOne(db, col, socket, memo);
    });
    /**
     * detete one memo by id
     */
    socket.on('DELETE_ONE', (id) => {
        console.log('delete_one', id)
        const db = MONGOINFO.db1.name;
        const col = MONGOINFO.db1.collection.memo;
        mongoAsync.deleteOne(db, col, socket, id);
    });
    /**
     * filter string
     * 
     * param : {filter: filter-string, num: read_size}
     */
    socket.on('FILTER_STRING', (param) => {
        //console.log(param);
        const db = MONGOINFO.db1.name;
        const col = MONGOINFO.db1.collection.memo;
        if(param.filter === ''){
            readLimit(param.num, socket)
        }else if(filterAnalisys.checkDate(param.filter)){
            console.log('date string')
            mongoAsync.filterFromDate(db, col, param, socket)
        }else{
            mongoAsync.filteredRead(db, col, param, socket);
        }
    });
};


module.exports = memoEvent;

});

//test
/*
console.log('test-on')
const date = { year: 2023, month: 8, date: 3, day: '木' }
const socket = {}
mongoStaffSche.readStaffSche(date, socket)
*/
httpServer.listen(5001);

console.log('\nnode-server running ..... \n')

