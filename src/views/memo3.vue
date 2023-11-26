<template>
  <div class="memo1" v-if="userName !== 'null'">
    <memo_base 
      :collectionName="userName+'_memo3'"
    />
  </div>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'
import memo_base from '@/components/memo_base.vue'

export default {
  components:{
    memo_base
  },
  props:{
    userName:String
  },
  setup() {
    
  },
}
</script>


<style>

</style>