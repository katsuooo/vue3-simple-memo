<template>
    <div v-if="false">
      <div v-if="loggedIn">
        <p>Hello, {{ username }}!</p>
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <p>You are not logged in.</p>
        <button @click="login">Login</button>
      </div>
    </div>
</template>
  
<script>
import mongoUrl from './mongoUrl'

async function server_fetch(url){
  /*
  const response = await fetch(url, { 
          method: 'POST',
          credentials: 'include', // クッキーの送信を許可
          mode: 'cors', // クロスオリジンリクエストのモード
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // ユーザー名やパスワードなどのログイン情報
            username: 'katsuooo',
            password: 'aaa'
          }),
  });*/
  const response = await fetch(url, { 
          method: 'GET',
          credentials: 'include', // クッキーの送信を許可
          mode: 'cors', // クロスオリジンリクエストのモード
  });
  console.log(response)
  return response
}

  export default {
    data() {
      return {
        loggedIn: false,
        username: null
      };
    },
    methods: {
      async checkSession() {
        // セッションの確認をバックエンドにリクエスト
        //const response = await fetch('http://localhost:5150/checkSession');
        const url = 'http://' + mongoUrl.getUrl()
        const response = await server_fetch(url + '/checkSession')
        const data = await response.json();
  
        this.loggedIn = data.loggedIn;
        if (this.loggedIn) {
          this.username = data.username;
        }
        console.log('check-session', this.username)
        this.$emit('sessionResponse', this.username)   //祖父まで伝搬させる
        if(this.username === null){
          return false
        }
        return true
      },
      async login(userName) {
        // ログインをバックエンドにリクエスト
        //await fetch('http://localhost:5150/login', { method: 'POST' });
        console.log('login-btn-on', userName, typeof(userName))
        const url = 'http://' + mongoUrl.getUrl()
        await fetch(url + '/login', { 
          method: 'POST',
          credentials: 'include', // クッキーの送信を許可
          mode: 'cors', // クロスオリジンリクエストのモード
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // ユーザー名やパスワードなどのログイン情報
            username: userName,
            password: 'aaa'
          }),
        });
  
        // セッションの確認を更新
        return await this.checkSession();
      },
      async logout(userName) {
        // ログアウトをバックエンドにリクエスト
        const url = 'http://' + mongoUrl.getUrl()
        await fetch(url + '/logout', { 
          method: 'POST',
          credentials: 'include', // クッキーの送信を許可
          mode: 'cors', // クロスオリジンリクエストのモード
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // ユーザー名やパスワードなどのログイン情報
            username: userName,
            password: 'aaa'
          }),
        });
  
        // セッションの確認を更新
        //await this.checkSession();
        this.$emit('exitSession')   //祖父まで伝搬させる
      }
    },
    mounted() {
      // コンポーネントがマウントされたときにセッションを確認
      this.checkSession();
    }
  };
  </script>
  