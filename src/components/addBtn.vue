<template>
    <v-app style="min-height:0dvh;">
    <v-layout-item
      v-scroll="onScroll"
      class="text-end pointer-events-none"
      model-value
      position="bottom"
      size="88"
    >
      <div class="ma-4">
        <v-fab-transition>
          <v-btn
            v-show="model"
            class="mt-auto pointer-events-initial"
            color="info"
            elevation="8"
            icon="mdi-plus"
            size="large"
            @click="onClick"
          />
        </v-fab-transition>
      </div>
    </v-layout-item>
</v-app>
  </template>
  
  <script setup>
  /**
   * add button floating
   * 
   */
    import { ref } from 'vue'
  
    const emit = defineEmits(['FAB_ON'])
    const model = ref(false)
    model.value = true
  
    function onScroll () {
      //model.value = window.scrollY > 200
      //model.value = true
    }
  
    function onClick () {
        emit('FAB_ON')
    }
  </script>
  
  <style scoped>
    .pointer-events-none {
      pointer-events: none;
    }
  
    .pointer-events-initial {
      pointer-events: initial;
    }
    
    .v-application__wrap{
      min-height: 0dvh !important;
    }
  </style>