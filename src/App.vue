<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
//import HelloWorld from './components/HelloWorld.vue'
import userLogin from '@/views/userLogin.vue'
import memo1 from '@/views/memo1.vue'
import memo2 from '@/views/memo2.vue'
import memo3 from '@/views/memo3.vue'
import userList from './user/user_list.json'
import fullCalendar from '@/components/FullCalendarPrint.vue'


var user = ref<String>('null')
function checkUserName(name:String){
  console.log(name)
  let judge = false
  userList.userName.forEach((u) => {
    if(u === name){
      judge = true
    }
  })
  console.log('result',judge)
  return judge
}
const router = useRouter()
/**
 * 
 * ボタンハンドラ
 * @param name 
 */
function SET_USER(name:String){
  console.log('user-set', name)
  if(checkUserName(name)){
    user.value = name
    router.push({name:'memo1'})  //memo1に遷移
  }
}
function EXIT_USER(name:String){
  console.log('exit-user')
  user.value = 'null'
  router.push({name:'userLogin'})  //memo1に遷移
}



</script>

<template>
  <session />
  <header v-if="user !== 'null'">
    <!--<div><span>user:{{ user }}</span></div>-->
    <div class="wrapper">
      <nav class="topnav">
        <!--<RouterLink to="/">login</RouterLink>-->
        <!--
        <RouterLink to="/memo1">memo1</RouterLink>
        <RouterLink to="/memo2">memo2</RouterLink>
        <RouterLink to="/memo3">memo3</RouterLink>-->
        <RouterLink :to="{name:'userLogin'}" style="display:none"></RouterLink>
        <RouterLink 
          :to="{name:'memo1'}"
          :props=true
          >memo1</RouterLink>
        <RouterLink :to="{name:'memo2'}" :props=true>memo2</RouterLink>
        <RouterLink :to="{name:'memo3'}" :props=true>memo3</RouterLink>
        <RouterLink :to="{name:'fullCalendar'}" :props=true>calendar</RouterLink>
      </nav>
    </div>
      </header>
  <userLogin
        v-on:setUser='SET_USER'
        v-on:exitUser="EXIT_USER"
        :user="user"
      />
  <RouterView :userName="user"/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  /*margin-top: 2rem;*/
}


nav a.router-link-exact-active {
  /*color: var(--color-text);*/
  /*color: var(--app-theme);*/
  /*background-color: rgba(192,197,194,0.9)*/
  /*background-color: var(--bs-card-cap-bg);*/
  background-color: rgba(33,37,41,0.03);
}

nav a.router-link-exact-active:hover {
  /*background-color: transparent;*/
  /*background-color: rgba(192,197,194,0.9)*/
  /*background-color: rgb(223, 180, 64);*/
  /*background-color: var(--bs-card-cap-bg);*/
  background-color: rgb(33,37,41,0.28);
  color: var(--bs-secondary-color)!important;
}


nav RouterLink {
  display: inline-block;
  /*padding: 0 1rem;*/
  padding: 0 0;
  border-left: 1px solid var(--color-border);
}
.selbtn{
  padding:1px 1px;
  margin:1px;
}

/*
nav a:first-of-type {
  border: 0;
}
*/
.text-muted {
    --bs-text-opacity: 1;
    color: var(--bs-secondary-color)!important;
}

/**
  navbar-style

*/
/* Add a black background color to the top navigation */
.topnav {
  background-color: var(--app-theme);
  /*background-color: rgb(var(--v-theme-info));*/
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a,
.topnav span {
  float: left;
  /*color: #000;*/
  /*color:rgba(60, 57, 57, 0.929);*/
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 14px;
}
.topnav span{
    text-align: right; 
}

/* Change the color of links on hover */
/*
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
*/
/* Add a color to the active/current link */
/*
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
*/








@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    /*margin-left: -1rem;*/
    font-size: 1rem;

    padding: 1rem 0;
    /*margin-top: 1rem;*/
    
  }
  /*
  .selbtn{
  padding:0;
  }*/
}

</style>
