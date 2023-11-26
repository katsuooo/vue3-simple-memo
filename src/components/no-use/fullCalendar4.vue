<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import ja from '@fullcalendar/core/locales/ja';

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        dayCellContent: this.customDayCellContent,
        locale: ja,
        events: [
          { title: 'Meeting', start: new Date() }
        ]
      },
      currentEvents: []
    }
  },
  methods: {
    customDayCellContent({ date, view }) {
      const dayElement = document.createElement('div');
      dayElement.textContent = date.getDate();
      dayElement.style.width = '100%';
      dayElement.style.height = '100%';
      // カスタムスタイルの追加
      //dayElement.classList.add('custom-day-cell');

      return { domNodes: [dayElement] };
    },
    handleSelect(selectInfo) {
      const title = prompt('Enter a title for your event:');
      if (title) {
        this.$refs.calendar.getApi().addEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
      this.$refs.calendar.getApi().unselect(); // Clear date selection
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    },
  }
})
</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>
/* Your styles here */
</style>
