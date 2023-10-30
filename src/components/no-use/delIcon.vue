<template>
    <div id="my-container" class='delIcon'>
  
      <span class="fas fa-trash-alt card_trash" v-b-tooltip.hover.left title="delete" @click="delOnx" :id="this.cardId" />
      <span class="fas fa-trash-alt card_trash" v-b-tooltip.hover.left title="delete" @click="delOnx" :id="this.cardId">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg>
      </span>
  
  
  <!--
  <click-confirm class='trash_confirm' button-size="sm" :messages="{title:'delete ?', yes:'yes', no:'no'}" 
  yes-class="btn btn-danger btn-circle" no-class="btn btn-warning btn-circle" 
  style='display:inline-block;float:right;' no-icon='' yes-icon=''>
  <span class="fas fa-trash-alt card_trash" v-b-tooltip.hover.left title="delete" @click="delOnx"/>
  </click-confirm>
  -->
      <!-- Our popover title and content render container -->
      <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
      <!-- We specify the same container as the trigger button, so that popover is close to button -->
      <b-popover
        :target="this.cardId"
        triggers="click"
        :show.sync="popoverShow"
        placement="auto"
        container="my-container"
        ref="popover"
        @show="onShow"
        @shown="onShown"
        @hidden="onHidden"
      >
        <template v-slot:title>
          <b-button @click="onClose" class="close" aria-label="Close">
            <span class="d-inline-block" aria-hidden="true">&times;</span>
          </b-button>
          delete?
        </template>
  
        <div>
          <b-button @click="onClose" size="sm" variant="warning">Cancel</b-button>
          <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
        </div>
      </b-popover>
    </div>
  </template>
  
  <script>
    export default {
      name: 'delIcon',
      props:{
          cardId: String
      },
      data() {
        return {
          popoverShow: false,
          memos: Array
        }
      },
      methods: {
        onClose() {
          this.popoverShow = false
        },
        onOk() {
          this.onClose()
          //alert('del-on' + this.cardId)
          this.$emit('delete_event_child', this.cardId);
        },
        onShow() {
        },
        onShown() {
        },
        onHidden() {
        },
        delOnx() {
          console.log('del-click')
          /* eslint-disable-next-line */
          let text;
          if (confirm("削除しますか？") == true) {
            text = "You pressed OK!";
            this.onOk()
          } else {
            text = "You canceled!";
            this.onClose()
          }
          console.log(text)
        }
        /*
        beforeMount(){
          for(let i=0; i<8; i++){
            this.memos.push({numString: String(i)})
          }
        }
        */
      }
    }
  </script>
  <style scoped>
  .delIcon{
      display: inline;
  }
  </style>