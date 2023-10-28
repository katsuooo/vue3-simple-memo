/*
 node server.js でnode socket server を起動する
*/

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

const mongoStaffSche = require('./mongoStaffSche.js')

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

