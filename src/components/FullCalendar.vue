<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        events: [
          { title: 'Meeting', start: new Date() }
        ]
      },
      collectionName: String
    }
  },
  props:{
    userName:String
  },
  beforeMount(){
    this.collectionName = this.userName + '_calendar'
  },
  mounted(){
    this.collectionName = this.userName + '_calendar'
  }

}
</script>

<template>
      <div>{{ collectionName }}</div>
  <FullCalendar :options='calendarOptions' />
</template>