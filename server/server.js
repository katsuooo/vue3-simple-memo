const express = require('express');
const session = require('express-session');
const cors = require('cors'); // corsミドルウェアの追加
const bodyParser = require('body-parser')
const app = express();

// Bodyパーサーを使用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ここで他のExpressの設定を追加 / セッション情報追加
const crypto = require('crypto');

// ランダムな文字列生成関数
const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const secretKey = generateRandomString(32); // 32文字のランダムな文字列を生成
console.log(secretKey);


// セッションの設定
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));


const corsOptions = {
    //origin: 'http://localhost:5200', // クライアントのオリジン
    origin: 'http://kdesign.sytes.net:5200', // クライアントのオリジン
    credentials: true, // クッキーを使用する場合に必要
};
// corsミドルウェアの使用
app.use(cors(corsOptions));
// 他のコードは省略...
// セッションの確認
app.get('/checkSession', (req, res) => {
    console.log('check-session',req.session.user)
    if (req.session.user) {
      res.send({ loggedIn: true, username: req.session.user.username });
    } else {
      res.send({ loggedIn: false });
    }
  });
  
  // ログイン
  app.post('/login', (req, res) => {
    // ログインのロジックを実装
    
    // ユーザー情報をセッションに保存
    //req.session.user = { username: 'exampleUser' };
    //res.send('Login successful');
    const { username, password } = req.body;
    //console.log('user-name', username)



    
    // ログインのロジックを実装
    // ユーザー名とパスワードを検証
  
//    if (username === 'katsuooo' && password === 'aaa') {
    if (password === 'aaa') {
      // ログイン成功時
      req.session.user = { username: username };
      res.status(200).send('Login successful');
    } else {
      // ログイン失敗時
      res.status(401).send('Login failed');
    }
  });
  
  // ログアウト
  app.post('/logout', (req, res) => {
    // セッションの破棄
    req.session.destroy();
    res.send('Logout successful');
  });
  



















const PORT = process.env.PORT || 5150;














/**
 * 
 * socket.ioをいれる
 * 
 * 
 * 
 */
const http = require('http').createServer(app);

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('A user connected');

    // ここでSocket.IOのイベントリスナーを追加

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


//const mongoStaffSche = require('./mongoStaffSche.js')
const mongoAsync = require('./mongoAsync.js');
const MONGOINFO = require('./config.js').MONGOINFO;
const filterAnalisys = require('./filterAnalisys.js')
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


//http.listen(5150);

console.log('\nnode-server running ..... port 5150\n')

