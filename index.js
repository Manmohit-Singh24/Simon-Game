const buttons = document.querySelectorAll(".btn");

let correctPattern = [];
let clickNum = 0;

let level = 1;

/*------------------------------------- Reusable  -------------------------------------*/
let h1 = document.querySelector("h1");
let container = document.querySelector(".container");
/*=============================================='Start game'===================================================*/

container.setAttribute("style", "pointer-events: none;")
document.addEventListener("keydown", gameStart);

function gameStart() {
    level = 1;

    h1.innerHTML = `Level:  ${level}`;

    h1.setAttribute("style", "animation : none ; border : none ;");
    setTimeout(createPattern, 500);

    document.removeEventListener("keydown", gameStart);
    container.setAttribute("style", "pointer-events: auto;");
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Creating a Pattern'===================================================*/

function createPattern() {
    clickNum = 0;

    let randomColor = buttons[Math.floor(Math.random() * buttons.length)];
    correctPattern.push(randomColor);

    randomColor.setAttribute("style", `--delay :0`);
    randomColor.classList.add("clicked");

    randomColor.querySelector("audio").play()

    setTimeout(() => randomColor.classList.remove("clicked"), 500);
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Capturing user's clicks'===================================================*/
for (const button of buttons) {
    button.addEventListener("click", (e) => {

        button.setAttribute("style", `--delay :0`);
        button.classList.add("clicked");

        setTimeout(() => {
            button.classList.remove("clicked")
        }, 300);

        if (e.target === correctPattern[clickNum]) {
            button.querySelector("audio").play();
            clickNum++;

            if (clickNum === correctPattern.length) {
                // Next Level
                h1.innerText = `Level: ${++level}`;
                clickNum = 0;
                setTimeout(createPattern, 500);
            }
        } else gameOver();
    });
}
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Game Over'===================================================*/
function gameOver() {

    h1.innerText = `Game Over \n Press any key to restart`;
    document.addEventListener("keydown", gameStart);
    correctPattern = [];
    clickNum = 0;

    container.classList.add("game-over");
    let overAudio = document.querySelector("audio.game-over")

    overAudio.play();
    overAudio.addEventListener("ended", () => {
        container.setAttribute("style", "pointer-events: none;");
    })

    setTimeout(() => container.classList.remove("game-over"), 1000);
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Pop Effect onload'===================================================*/
document.addEventListener("DOMContentLoaded", () => {
    let delayCounter = 3;
    setTimeout(() => {
        for (const button of buttons) {
            button.setAttribute("style", `--delay :${0.2 * delayCounter++}s`);
            button.classList.add("appear");
        }
    }, 100);
})
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Instruction'===================================================*/
document.querySelector(".fa-circle-info").addEventListener("click", (e) => {
    e.target.classList.toggle("opened")
    document.querySelector(".info").classList.toggle("i-hide")
    document.querySelector(".info").setAttribute("style", `display: block;`);
})
/*-----------------------------------------------------------------------------------------------------------*/