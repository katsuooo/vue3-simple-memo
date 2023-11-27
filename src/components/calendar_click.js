/**
 * 
 * 
 * カレンダーのボタンが押されたときのハンドラ
 * 
 * 
 * jsでのclickハンドラ設置がうまくいかないのでfullcalendarのhandleEventsで
 * DOMの書き換えを行う
 * 
 */
import calendar_style from './calendar_style'
/**
 * 
fc-prev-button
fc-next-button
fc-today-button

fc-dayGridMonth-button
fc-timeGridWeek-button
fc-timeGridDay-button
 *
 */
function btnClick(){
    console.log('btn-click')
    calendar_style.btnSmall()
}
/**
 * 
 * カレンダのボタンが押された時のDOM書き換え
 * 
 * 
 */
function clickEvent(){
    var element = document.getElementsByClassName('fc-prev-button')
    element.onClick = btnClick()
}



export default{
    clickEvent: clickEvent
}