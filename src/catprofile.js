'use strict';
// JSON 파일 불러오기
function loadCat() {
    return fetch('data/cats.json')
        .then(response => response.json())
        .then(json => json.cats);
}

// 고양이 정보를 목록에 업데이트하기
function displayCats(cats) {
    const container = document.querySelector('.cats')
    container.innerHTML = cats.map(cat => createHTMLString(cat)).join('');
}

// 정보를 HTML형식으로 바꾸기
function createHTMLString(cats) {
    return `
    <div class="cat" data-number="${cats.number}">
        <img src="${cats.image}" alt="">
        <h3>${cats.name}</h3>
        
        <div class="cat-Description" data-number="${cats.number}">
            <ul>
                <li>이름 : ${cats.name}</li>
                <li>성별 : ${cats.gender}</li>
                <li>중성화 : ${cats.TNR}</li>
                <li>발견 날짜 : ${cats.uploadDate}</li>
                <li>번호 : ${cats.number}</li>
            </ul>
        </div>
    </div>
    `;
}

function clickCat(cats) {
    const cat = document.querySelector(".cats");
    const catD = document.querySelectorAll(".cat-Description");
    const catP = document.querySelectorAll(".cat");

    cat.addEventListener('click', (event) => {
        const dataset = event.target.nodeName === "DIV" ? event.target.dataset : event.target.parentNode.dataset;
        const num = dataset.number;

        if(num == null){
            return;
        }
        catD.forEach((catd)=>{
            if (catd.dataset.number !== num)
                catd.classList.remove('cat-open');
        });
        catD[num-1].classList.toggle('cat-open');
    });

    window.addEventListener('click', (event) => {
        const dataset = event.target.nodeName === "DIV" ? event.target.dataset : event.target.parentNode.dataset;
        const num = dataset.number;
        if(event.target.nodeName === "div"){
            console.log(event.target);
        }

        catD.forEach((catd)=>{
            if (catd.dataset.number !== num)
                catd.classList.remove('cat-open');
        });
    });
}

// 고양이 정보 불러오기
loadCat()
    .then(cats => {
        displayCats(cats);
        clickCat(cats);
    })
    .catch(console.log);
