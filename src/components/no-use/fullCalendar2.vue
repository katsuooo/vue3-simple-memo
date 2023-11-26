<template>
    <div>
      <FullCalendar
        :options="calendarOptions"
        @eventClick="handleEventClick"
        @dateClick="handleDateClick"
      />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';

  // 日本語のロケールファイルをインポート
import jaLocale from '@fullcalendar/core/locales/ja';
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          events: [
            { title: 'Event 1', date: '2023-11-25' },
            { title: 'Event 2', date: '2023-11-26' },
            // Add more events as needed
          ],
          editable: true, // Enable event editing
          eventLimit: true, // allow "more" link when too many events
          selectable: true, // Enable date selection
          select: this.handleDateSelect,
          // locales オプションを指定して日本語のロケールを設定
          locales: [jaLocale],
        },
      };
    },
    /*
    mounted() {
    const camelize = str => str.split('-').map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item).join("")
    Object.keys(this.$refs.fullCalendar._events).forEach(name=>this.$refs.fullCalendar._events[camelize(name)] = this.$refs.fullCalendar._events[name])
    },*/

    methods: {
      handleEventClick(info) {
        // Handle event click
        const newTitle = prompt('Enter a new title for the event:', info.event.title);
        if (newTitle) {
          info.event.setProp('title', newTitle);
        }
      },
      handleDateClick(dateClickInfo) {
        // Handle date click
        console.log('handle-date-click')
        const title = prompt('Enter a title for your event:');
        if (title) {
            this.$refs.calendar.getApi().addEvent({
                title,
                start: dateClickInfo.dateStr,
                allDay: true, // assuming an all-day event
            });
        }
      },
      handleDateSelect(selectInfo) {
        // Handle date selection (if needed)
        // This is the method used when the user selects a range of dates
        const title = prompt('Enter a title for your event:');
        if (title) {
            this.$refs.calendar.getApi().addEvent({
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
        }
        this.$refs.calendar.getApi().unselect(); // clear date selection
      }
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  