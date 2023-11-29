<script setup lang="ts">
import fullcalendar from '@/components/fullCalendar.vue'
import domtoimage from 'dom-to-image-more';

async function downloadImage(){
  //const targetElement = this.$refs.targetElement;
  const targetElement = document.getElementById('targetElement')
  
  try {
    //const elm = document.getElementById('app')
    //const org_width = window.getComputedStyle(elm, null).getPropertyValue('width');
    //const org_min = window.getComputedStyle(elm, null).getPropertyValue('min-width');

    //console.log('width',org_width,org_min)
    //document.getElementById('targetElement').classList.add('md-size');
    //to image
    const dataUrl = await domtoimage.toPng(targetElement);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'image.png';
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

</script>

<template>
    <div id="targetElement" style="background-color:#fff">
      <fullcalendar />
    </div>
    <div class='d-grid gap-2'>
      <button class='btn savebtn' type='button' @click="downloadImage">png保存</button>
    </div>
</template>

<style scoped>
@media print {
  #targetElement{
    margin-right:28px;
    /*margin-bottom:24px;*/
  }
}
.savebtn{
  background-color: var(--app-theme);
  color:#fff;
}
</style>
