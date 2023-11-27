/**
 * 
 * 
 * view modeの取得
 * 
 * 
 * 
 */
/*
<div class="fc-timeGridWeek-view fc-view fc-timegrid">
<table role="grid" class="fc-scrollgrid  fc-scrollgrid-liquid"><thead role="rowgroup">
<tr role="presentation" class="fc-scrollgrid-section fc-scrollgrid-section-header ">
<th role="presentation">
...
*/
/**
テーブル直前のタグfc-viewとともにviewの状態クラスがある
fc-dayGridMonth-view
fc-timeGridWeek-view
fc-timeGridDay-view
 */
function getViewMode(){
    let viewMode = ''
    var element = document.getElementsByClassName('fc-view')
    console.log('class',element[0].classList.value)
    //if('fc-dayGridMonth-view' in element[0].classList){
    if(element[0].classList.value.includes('fc-dayGridMonth-view')){
        viewMode = 'MONTH'
    }else if(element[0].classList.value.includes('fc-timeGridWeek-view')){
        viewMode = 'WEEK'
    }else if(element[0].classList.value.includes('fc-timeGridDay-view')){
        viewMode = 'DAY'
    }
    return viewMode
}


export default{
    getViewMode: getViewMode
}