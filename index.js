const buttons = document.querySelectorAll(".btn");
let correctPattern = [];
let clickNum = 0;
let level = 1;
let startGameMethod = "Press A Key";
/*------------------------------------- Reusable  -------------------------------------*/
let divBtn = document.querySelector(".buttons");
let h1 = document.querySelector("h1");
let divH1 = document.querySelector(".h1");
let span1 = document.querySelector(".first");
let span2 = document.querySelector(".second");
let container = document.querySelector(".container");

/*=============================================='Game variables'===================================================*/

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Load'===================================================*/


document.addEventListener("DOMContentLoaded", () => {
    h1OnLoad();
    container.setAttribute("style", "pointer-events: none;");
    setTimeout(() => {
        document.addEventListener("keydown", gameStart);
        document.addEventListener("touchstart", gameStart);
    }, 1000)
})
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='h1 effects'===================================================*/

function h1OnLoad() {
    span2.style.opacity = "0";
    setTimeout(() => {
        span1.style.border = "none";
        span2.style.opacity = "1";
    }, 1500);
    console.log(document.documentElement.clientWidth)
    if (document.documentElement.clientWidth <= 900 && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))) { // i.e it is a tablet or mobile
        startGameMethod = "Tap anywhere";
    }
    span1.innerText = `${startGameMethod} To Start`;
}

function gameStartAnimations() {
    divH1.classList.add("hide");

    let time = 0;

    if (divBtn.style.opacity === "0") {
        divBtn.style.opacity = "1";
        container.classList.remove("game-over");
        time = 300;
    }

    setTimeout(() => {
        divH1.classList.remove("load");
        buttonsAppear();

        span1.innerText = "Level:";
        span2.innerText = level;

        setTimeout(() => {
            divH1.classList.remove("hide");

            setTimeout(() => {
                divBtn.classList.add("game-time");
                divH1.classList.add("game-time");
            }, 500)

        }, 1000)
    }, 1000 + time);


    return time + 1000 + 1000 + 500;
}

function gameOverAnimations(btnClicked) {

    divH1.classList.add("hide")

    btnClicked.classList.add("game-over");
    container.classList.add("game-over");

    for (const button of buttons) {
        if (button !== btnClicked) button.classList.add("game-over-other");
    }

    setTimeout(() => {

        span1.innerText = "🥺"
        span2.innerText = "🥺"
        divH1.classList.remove("hide")

        setTimeout(() => {
            divBtn.style.opacity = "0";
            divH1.classList.add("hide")

            setTimeout(() => {
                buttonsDisappear();
                for (const button of buttons) {
                    button.classList.remove("game-over-other");
                    button.classList.remove("game-over");
                }
                divBtn.classList.remove("game-time")
                divH1.classList.remove("game-time")

                setTimeout(() => {
                    span1.innerHTML = `Game Over <br> ${startGameMethod} to Restart`
                    span2.innerText = "...";

                    span1.classList.add("first-over");
                    span2.classList.add("second-over");
                    divH1.classList.add("load")
                    divH1.classList.remove("hide")
                }, 500)

            }, 500)

        }, 1000)

    }, 500);

    return 500 * 3 + 1000;
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Start game'===================================================*/

function gameStart() {
    let time = gameStartAnimations();
    level = 1;
    setTimeout(() => {
        createPattern();
        document.removeEventListener("keydown", gameStart);
        document.removeEventListener("touchstart", gameStart);
        container.setAttribute("style", "pointer-events: auto;");
    }, time + 700)

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
            if (clickNum === correctPattern.length) nextLevel();

        } else gameOver(e.target);
    });
}
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Next level '===================================================*/
function nextLevel() {
    span2.style.opacity = "0";
    setTimeout(() => {
        span2.style.opacity = "1";
        span2.innerText = ++level;
    }, 300)

    clickNum = 0;

    setTimeout(createPattern, 1000);
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Game Over'===================================================*/
function gameOver(btnClicked) {
    correctPattern = [];
    clickNum = 0;

    let overAudio = document.querySelector("audio.game-over")
    overAudio.play();
    overAudio.addEventListener("ended", () => {
        container.setAttribute("style", "pointer-events: none;");
    })

    let time = gameOverAnimations(btnClicked);

    setTimeout(() => {
        document.addEventListener("keydown", gameStart);
        document.addEventListener("touchstart", gameStart);
    }, time + 500)
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Buttons effect'===================================================*/
function buttonsAppear() {
    let delayCounter = 0;
    for (const button of buttons) {
        button.setAttribute("style", `--delay :${0.2 * delayCounter++}s`);
        button.classList.add("appear");
    }
}

function buttonsDisappear() {
    let delayCounter = 0;
    for (const button of buttons) {
        button.setAttribute("style", `--delay :${0.2 * delayCounter++}s`);
        button.classList.remove("appear");
    }
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Instruction'===================================================*/
document.querySelector(".fa-circle-info").addEventListener("click", (e) => {
    e.target.classList.toggle("opened")
    document.querySelector(".info").classList.toggle("i-hide")
    document.querySelector(".info").setAttribute("style", `display: block;`);
})
/*-----------------------------------------------------------------------------------------------------------*/

