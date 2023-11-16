

<template>
  <div>
    <div v-if="user===null">
    <h1>login</h1>
    <p style="color:#808080">nick nameを入力してください</p>
      <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">→</span>
      <input 
        type="text" 
        class="form-control" 
        placeholder="nick-name" 
        aria-label="Username" 
        aria-describedby="basic-addon1"
        v-model="nickName"
      >
      <span class="input-group-text style='background-color:sky'"
        @click="nickNameInput"
        >
        ok</span>
      </div>
    </div>
    <session 
      ref="session2"
      @sessionResponse="SESSION_RESPONSE"
      @exitSession="EXIT_SESSION"
       />
  </div>

</template>

<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue'
import session from '@/components/session.vue'

const props = defineProps(['user'])

var nickName = ref('')
const emit = defineEmits(['setUser'])


const session2 = ref(null)
function nickNameInput(){
  console.log('nick-name-set', nickName.value)
  //emit('setUser', nickName.value)
  if(session2.value.login(nickName.value)){
    //emit('setUser', nickName.value)
  }
  //console.log('session-fail')
}
function SESSION_RESPONSE(responseName:String){
  console.log('session-response', responseName)
  emit('setUser', responseName)
}
function EXIT_SESSION(){
  emit('exitUser')
}


</script>