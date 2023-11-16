const express = require('express');
const session = require('express-session');
const cors = require('cors'); // corsミドルウェアの追加
const bodyParser = require('body-parser')

const app = express();

// Bodyパーサーを使用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
    origin: 'http://localhost:5173', // クライアントのオリジン
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

    console.log('user-name', username)



    
    // ログインのロジックを実装
    // ユーザー名とパスワードを検証
  
    if (username === 'katsuooo' && password === 'aaa') {
      // ログイン成功時
      req.session.user = { username: 'katsuooo' };
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
  













const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
