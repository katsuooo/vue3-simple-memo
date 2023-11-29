<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
// 日本語のロケールファイルをインポート
import ja from '@fullcalendar/core/locales/ja';
//import jaLocale from '../../public/locale/ja.json';
import calendar_style from './calendar_style.js'
//import calendar_click from './calendar_click.js'

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
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        //select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        dateClick: this.handleDateSelect,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
        dayCellContent: this.customDayCellContent,
        // locales オプションを指定して日本語のロケールを設定
        locale: ja,
        
        eventTimeFormat: { // like '14:30:00' no view in template
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        },
        height: 600,
        views: {
          dayGridMonth: { // name of view
            //titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
            // other view-specific options here
          },
          dayGrid: {
            // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
          },
          timeGrid: {
            // options apply to timeGridWeek and timeGridDay views
            //titleFormat: { month: '2-digit', day: '2-digit' }
          },
          week: {
            // options apply to dayGridWeek and timeGridWeek views
            titleFormat: { month: '2-digit', day: '2-digit' }
          },
          day: {
            // options apply to dayGridDay and timeGridDay views
            titleFormat: { month: '2-digit', day: '2-digit' }
          }
        }
      },
      currentEvents: [],
    }
  },
  mounted(){
    console.log('mounted')
    calendar_style.btnSmall()
    //calendar_click.clickEvent()
    var element = document.getElementsByClassName('fullCalendar')
    console.log('get-view', element)
  },
  methods: {
    handleWeekendsToggle() {
      this.calendar.getOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      console.log('select-info', selectInfo)
      let title = prompt('スケジュール入力')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        /*
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })*/
        /*
        start,endはdate型
        時間表示をやめる
        allday=trueとし、bg-colorを設定する
        */
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.date,
          allDay: true
        })
      }
      console.log('input-ok')
      console.log('id:', createEventId())
      console.log(title)
      console.log('start:', selectInfo.startStr)
      console.log('end:', selectInfo.endStr)
      console.log('allDay:', selectInfo.allDay)
      //this.currentEvents.push({ title: 'event 2', date: '2023-11-02' })
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    customDayCellContent({ date, view }) {
      const dayElement = document.createElement('div');
      dayElement.textContent = date.getDate(); // Customize the content as needed
      dayElement.style.width = '100%'; // Set the width to 100% to expand the cell
      dayElement.style.height = '100%'; // heightはcalendarOptons.heightで設定

      return { domNodes: [dayElement] };
    },
    handleEventAdd(eventAddInfo) {
      // Handle event add (save the data to your database or perform other actions)
      const newEvent = eventAddInfo.event;
      console.log('New event added:', newEvent);

      // Perform data saving logic here, for example, sending data to a server
      // axios.post('/api/events', { title: newEvent.title, start: newEvent.start, ... })
    },
    handleSelect(selectInfo) {
      // Handle selection of a range of dates
      console.log('handle-select')
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
    handleEvents(events) {
      console.log('day-click',events)
      this.currentEvents = events
      calendar_style.btnSmall()   //top buttonの表示変更
    },
    /*
    handleEventRender(info) {
      // イベントの時間要素を非表示にする
      info.el.querySelector('.fc-time').style.display = 'none';
    },*/
    handleEventRender(info) {
      console.log('event-render')
      // イベントの時間要素を非表示にする
      const timeElement = info.el.querySelector('.fc-time');
      if (timeElement) {
        console.log('time-element')
        timeElement.style.display = 'none';
      }

      // イベントのタイトルに時間を使用する
      /*
      const titleElement = info.el.querySelector('.fc-title');
      if (titleElement) {
        titleElement.innerHTML = `<b>${info.event.start.getHours()}時</b><i>${info.event.title}</i>`;
      }*/
    },
  }
})

</script>

<template>
  <div class='demo-app' v-if="userName !== 'null'">
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
        @eventAdd="handleEventAdd"
        @select="handleSelect"
        @eventRender="handleEventRender"
      >
        <template v-slot:eventContent='arg'>
          <!--
          <b>{{ arg.timeText }}</b>-->
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  /*padding: 3em;*/
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

</style>