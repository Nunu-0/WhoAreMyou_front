// const content = "Hi. I'm Somi, \n front-end developer.";
const content = "안녕하세요!\n 상명대 고양이들과의 공존을 위한 동행,\n'상냥행' 입니다.";
const text = document.querySelector(".text");
let i = 0;

function typing(){
    if (i < content.length) {       
        let txt = content[i++];
        text.innerHTML += txt=== "\n" ? "<br/>": txt;
    }
}
setInterval(typing, 120)