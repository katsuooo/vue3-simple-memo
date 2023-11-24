<!-- memo / bg, outline selected by :color -->
<template>
    <div class="f9">
      <div>user:&nbsp;&nbsp;{{ collectionName }}</div>
        <div class="form-group" style='display:block'>
          <input type='text' class='form-control form-control-sm' id='filter' placeholder='検索...' :value='this.filter' @input="filterWrite($event.target)"/>
        </div>
      <transition-group name='list-complete' tag='div'>
        <card class='list-complete-item' v-for='(item, index) in this.memos' :key=item.viewIndex v-bind:cardIndex='index' v-bind:memo='item' v-bind:cardStyle='cardStyle' v-on:editing_event_parent='editOnParent' v-on:delete_event_parent='deleteOn'/>
      </transition-group>
      <div class='d-grid'>
      <button  v-if="this.memos.length >= 10" class='btn btn-sm btn-block btn-outline-danger' @click='nextData'>next10</button>
      </div>
      <span style="background-color:rgba(224, 198, 142, 0.54);color:rgba(50,50,50,0.75);">memoを書くと⊕ボタンで追加できます</span>
      <addBtn
        v-on:FAB_ON="addBtnOn"
      />
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client'
  import card from '@/components/card.vue'
  import moment from 'moment'
  /* eslint-disable-next-line */
  import mongoUrl from './mongoUrl'
  import addBtn from '@/components/addBtn.vue'
  //import mongodb from '@/components/mongodb.vue'
  
  /**
   * transition control
   */
  /*
  function transition_off(){
    return 'transition-off'  // set dummy name
  }
  function transition_on(){
    return 'list-complete'
  }
  */
  
  /**
   * memo.text >>> memo.lines[]
   * @param {String} memo 
   */
  function shapeMemo(memo){
      var newMemo = {}
      newMemo._id = memo._id;
      newMemo.datetime = memo.datetime;
      newMemo.lines = memo.text.split('\n');
      return newMemo;
  }
  /**
   * text change check
   */
  function isChange(nowMemo, newMemo){
    if (nowMemo === newMemo){
      return false;
    }
    return true;
  }
  /**
   * get datetime
   */
  function getDatetime(){
    return moment().format().split('+')[0];
  }
  /**
   * 
   */
  export default {
    name: 'memo',
    components: {
      card,
      addBtn
    },
    props:{
      collectionName: String,
    }, 
    data: () => ({
      memos: Array,
      socket: io(mongoUrl.getUrl(), {transports: ['websocket']}),
      //socket: io('18.178.12.57:5150', {transports: ['websocket']}),
      test_memos:Array,
      filter: '',
      read_size: 20,
      cardStyle: String,
      //transition_name: String
      viewIndexMaster: 0  // memo-renban
    }),
    methods: {
      textNew(val){
        this.memos.text = val;
      },
      editOnParent:function(cardIndex, newText){
        if (!isChange(this.memos[cardIndex].text, newText)){
          return;
        }
        this.memos[cardIndex].text = newText;
        this.memos[cardIndex].datetime = getDatetime();
        const shaped = shapeMemo(this.memos[cardIndex]);
        console.log('edit:', this.collectionName, typeof(this.collectionName))
        if(this.memos[cardIndex]._id === 'new'){
          this.socket.emit('ADD_NEW_ONE', {d:shaped, col:this.collectionName});
        }else{
          this.socket.emit('UPSERT_ONE', {d:shaped, col:this.collectionName});
        }
      },
      /**
         * on add new button
         */
      addBtnOn: function(){
        if(this.memos[0] !== undefined){
          if(this.memos[0]._id === 'new'){
            return;
          }
        }
        const newMemo = [{_id:'new', text:'', datetime:getDatetime(), viewIndex: this.viewIndexMaster++}];
        this.memos.splice(0,0,newMemo[0]);
      },
      successAlert: function(){
        //dummy
      },
      /**
       * 
       */
      deleteOn: function(cardIndex){
        if (this.memos[cardIndex]._id !== 'new'){
          this.socket.emit('DELETE_ONE', {id:this.memos[cardIndex]._id, col:this.collectionName});
        }
        this.memos.splice(cardIndex, 1);
      },
      /**
       * next data request
       */
      nextData: function(){
        this.show = !this.show;
      },
      /**
       * flter change
       */
      filterWrite: function(target){
        this.$emit('input', target.value);
        if(target.value === this.filter){
          return
        }
        this.filter = target.value;
        this.socket.emit('FILTER_STRING', {filter: this.filter, num: this.read_size, col:this.collectionName});  
      }
    },
    mounted(){
      this.socket.on('MESSAGE', (mes) => {
        this.messages = [...this.messages, mes];
      }),
      this.socket.on('READLIMIT_RESULT', (mes) => {
        var buf = [];
        mes.forEach( m => {
          var jointext;
          if(m.lines){
            jointext = m.lines.join('\n');
          }else if(m.text){
            jointext = m.text;            
          }else{
            jointext = '';
          }
          buf.push({_id: m._id, datetime: m.datetime, text: jointext, viewIndex: this.viewIndexMaster++});
        });
        this.memos = buf;
        //memoなしのときはaddをたたく
        if(this.memos.length === 0){
          this.addBtnOn()
        }
          }),
          /**
           * new mongo id set
           */
          this.socket.on('NEW_ID', (mes) => {
              if(this.memos[0]._id === 'new'){
          this.transition_name = 'transition-off'
                  this.memos[0]._id = mes;
          //this.transition_name = 'list-complete'
        }
          })
    },
    beforeMount(){
      //this.memos = [{datetime:'', text:'', _id:''}];
      this.memos = []
      this.socket.emit('READLIMIT', {num:this.read_size, col:this.collectionName});
      this.cardStyle = this.$route.params.color
    },
    watch:{
      '$route.params.color': function(){
        this.cardStyle = this.$route.params.color
      }
    }
  }
  </script>
  <style>
  .form-group{
    margin-bottom: 0px;
    display: inline-block;
    padding-right: 0px;
  }
  /**
   * transition
   */
  .list-complete-item {
    transition: all 1s;
    display: block;
    margin-bottom: 1px;
  }
  .list-complete-enter, .list-complete-leave-to{
    opacity: 0;
    transform: translateX(-100%);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  </style>