'use strict';
// Calendar -------------------------------
let date = new Date();

const renderMonthDay = () => {
    const viewMonth = date.getMonth();
    const viewDay= date.getDate();

    // view
    document.querySelector('.month_day').textContent = `${viewMonth + 1}월 ${viewDay}일`;
}

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    // view
    document.querySelector('.year_month').textContent = `${viewYear}.${viewMonth + 1}`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);
    
    dates.forEach((date, i)=>{
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                        ? 'this' : 'other';
        dates[i] = `<div class = "date ${condition}">${date}</div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');
}

const todayView = () =>{
    // 오늘 날짜
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    const today = new Date();

    if(viewMonth === today.getMonth() && viewYear === today.getFullYear()){
        for(let date of document.querySelectorAll('.this')){
            if(+date.innerText === today.getDate()){
                date.classList.add('today');
                break;
            }
        }
    }
}

renderMonthDay();
renderCalendar();
todayView();

const prevMonth = () =>{
    date.setDate(1);
    date.setMonth(date.getMonth()-1);
    renderCalendar();
}

const nextMonth = () =>{
    date.setDate(1);
    date.setMonth(date.getMonth()+1);
    renderCalendar();
}

const goToday = () =>{
    date = new Date();
    renderCalendar();
    todayView();
}

const prevYesterday = () =>{
    date.setDate(date.getDate()-1);
    renderMonthDay();
}

const Today = () =>{
    date = new Date();
    renderMonthDay();
}

const nextTomorrow = () =>{
    date.setDate(date.getDate()+1);
    renderMonthDay();
}