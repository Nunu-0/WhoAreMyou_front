'use strict';

// JSON 파일 불러오기
function loadCat(){
    return fetch('data/cats.json')
    .then(response => response.json())
    .then(json => json.cats);
}

// 고양이 정보를 목록에 업데이트하기
function displayCats(cats){
    const container = document.querySelector('.cats')
    container.innerHTML = cats.map(cat => createHTMLString(cat)).join('');
}

// 정보를 HTML형식으로 바꾸기
function createHTMLString(cats){
    return `
    <div class="cat"><img src="${cats.image}" alt=""><h3>${cats.name}</h3></div>
    `;
}

// 고양이 정보 불러오기
loadCat()
.then(cats => {
    displayCats(cats);
    setEventListner(cats);
})
.catch(console.log);

// Calendar -------------------------------
let date = new Date();

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    const viewDay= date.getDate();

    // view
    document.querySelector('.month_day').textContent = `${viewMonth + 1}월 ${viewDay}일`;
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

    // 오늘 날짜
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

renderCalendar()

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
}

const prevYesterday = () =>{
    date.setDate(date.getDate()-1);
    renderCalendar();
}

const Today = () =>{
    date = new Date();
    renderCalendar();
}

const nextTomorrow = () =>{
    date.setDate(date.getDate()+1);
    renderCalendar();
}