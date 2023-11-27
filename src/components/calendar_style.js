/**
 * 
 * 
 * カレンダーのスタイルを変更する
 * 
 * fc-prev-button fc-button fc-button-primary
 */
import calendar_view from './calendar_view.js'
/**
 * 
 * header タイトルの変更
 * 
 */
/*
<div class="fc-toolbar-chunk"><h2 class="fc-toolbar-title" id="fc-dom-86">2023年11月</h2></div>
*/
function titleSmall(){
    var element = document.getElementsByClassName('fc-toolbar-title')
    console.log('title-elm', element[0])
    console.log('font-size', element[0].style.fontSize )
    //viewにより、タイトル文字列をかえる
    //element[0].textContent = '今'
    //console.log('view-mode',calendar_view.getViewMode())
    if(calendar_view.getViewMode() === 'WEEK'){
        element[0].style.fontSize = '18px'
    }else{
        element[0].style.fontSize = '21px'
    }
}
/**
 * 
 * top 右列ボタンの変更
 * 
 * 
 */
/*
fc-dayGridMonth-button
fc-timeGridWeek-button
fc-timeGridDay-button*/
function btnSmallRight(){
    var element = document.getElementsByClassName('fc-dayGridMonth-button')
    //console.log(element, element.length)
    //console.log(element[0])
    element[0].classList.remove('fc-button')
    //element[0].classList.remove('fc-button-primary')
    element[0].classList.add('btn') 
    element[0].classList.add('btn-sm')  
    element[0].classList.add('rounded-pill')  
    //console.log(element[0].classList)

    var element = document.getElementsByClassName('fc-timeGridWeek-button')
    element[0].classList.remove('fc-button')
    //element[0].classList.remove('fc-button-primary')
    element[0].classList.add('btn') 
    element[0].classList.add('btn-sm')  
    element[0].classList.add('rounded-pill')  

    var element = document.getElementsByClassName('fc-timeGridDay-button')
    //console.log('today',element[0])
    element[0].classList.remove('fc-button')
    //element[0].classList.remove('fc-button-primary')
    element[0].classList.add('btn') 
    element[0].classList.add('btn-sm') 
    element[0].classList.add('rounded-pill') 

}

/**
 * 
 * top マージン調整 
 * 
 */
/*
<div class="fc-header-toolbar fc-toolbar fc-toolbar-ltr"><div class="fc-toolbar-chunk"><div class="fc-button-group"><button type="button" title="前" aria-pressed="false" class="fc-prev-button fc-button-primary btn btn-sm rounded-pill"><span class="fc-icon fc-icon-chevron-left"></span></button><button type="button" title="次" aria-pressed="false" class="fc-next-button fc-button-primary btn btn-sm rounded-pill"><span class="fc-icon fc-icon-chevron-right"></span></button></div><button type="button" title="今日" disabled="" aria-pressed="false" class="fc-today-button fc-button-primary btn btn-sm rounded-pill">今</button></div><div class="fc-toolbar-chunk"><h2 class="fc-toolbar-title" id="fc-dom-1" style="font-size: 21px;">2023年11月</h2></div><div class="fc-toolbar-chunk"><div class="fc-button-group"><button type="button" title="月" aria-pressed="true" class="fc-dayGridMonth-button fc-button-primary fc-button-active btn btn-sm rounded-pill">月</button><button type="button" title="週" aria-pressed="false" class="fc-timeGridWeek-button fc-button-primary btn btn-sm rounded-pill">週</button><button type="button" title="日" aria-pressed="false" class="fc-timeGridDay-button fc-button-primary btn btn-sm rounded-pill">日</button></div></div></div>
*/
function topStyle(){
    var element = document.getElementsByClassName('fc-header-toolbar')
    element[0].style.marginTop = '8px'
    element[0].style.marginBottom = '5px'
}

/**
 * 
 * header ボタンのスタイル変更
 * 
 * 
 */
function btnSmall(){
    var element = document.getElementsByClassName('fc-prev-button')
    //console.log(element, element.length)
    //console.log(element[0])
    element[0].classList.remove('fc-button')
    //element[0].classList.remove('fc-button-primary')
    element[0].classList.add('btn') 
    element[0].classList.add('btn-sm')  
    element[0].classList.add('rounded-pill')  
    //console.log(element[0].classList)

    var element = document.getElementsByClassName('fc-next-button')
    element[0].classList.remove('fc-button')
    //element[0].classList.remove('fc-button-primary')
    element[0].classList.add('btn') 
    element[0].classList.add('btn-sm')  
    element[0].classList.add('rounded-pill')  

    var element = document.getElementsByClassName('fc-today-button')
    //console.log('today',element[0])
    element[0].textContent = '今'
    element[0].classList.remove('fc-button')
    //element[0].classList.remove('fc-button-primary')
    element[0].classList.add('btn') 
    element[0].classList.add('btn-sm') 
    element[0].classList.add('rounded-pill') 

    titleSmall()
    btnSmallRight()
    topStyle()
}



/*
var element = getElementByClassName()
element.addClass('btn_sm')
fc-next-button
var element = getElementByClassName()
element.addClass('btn_sm')
fc-today-button

var element = getElementByClassName()
element.addClass('btn_sm')
fc-dayGridMonth-button
var element = getElementByClassName()
element.addClass('btn_sm')
fc-timeGridWeek-button
var element = getElementByClassName()
element.addClass('btn_sm')
fc-timeGridDay-button

var element = getElementByClassName
element.addClass()
*/







export default{
    btnSmall: btnSmall
}