<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
//import HelloWorld from './components/HelloWorld.vue'
import userLogin from '@/views/userLogin.vue'
import memo1 from '@/views/memo1.vue'
import memo2 from '@/views/memo2.vue'
import memo3 from '@/views/memo3.vue'
import userList from './user/user_list.json'

var user = ref(null)
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
function SET_USER(name:String){
  console.log('user-set', name)
  if(checkUserName(name)){
    user.value = name
    router.push({name:'memo1'})  //memo1に遷移
  }
}



</script>

<template>
  <header v-if="user !== null">
    <!--<div><span>user:{{ user }}</span></div>-->
    <div class="wrapper">
      <nav>
        <!--<RouterLink to="/">login</RouterLink>-->
        <!--
        <RouterLink to="/memo1">memo1</RouterLink>
        <RouterLink to="/memo2">memo2</RouterLink>
        <RouterLink to="/memo3">memo3</RouterLink>-->
        <RouterLink 
          class='btn btn-sm btn-outline-info' 
          :to="{name:'memo1'}"
          :props=true
          >memo1</RouterLink>
        <RouterLink class='btn btn-sm btn-outline-success' :to="{name:'memo2'}" :props=true>memo2</RouterLink>
        <RouterLink class='btn btn-sm btn-outline-danger' :to="{name:'memo3'}" :props=true>memo3</RouterLink>
      </nav>
    </div>
  </header>
  <userLogin
        v-on:setUser='SET_USER'
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
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

/*
nav a:first-of-type {
  border: 0;
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
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
