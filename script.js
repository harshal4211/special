/* =====================================================
   SANJIVANI BIRTHDAY SURPRISE
   COMPLETE SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const startBtn =
    document.getElementById("startBtn");

const startScreen =
    document.getElementById("startScreen");

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

const arrow =
    document.getElementById("arrow");

const bowString =
    document.getElementById("bowString");

const targetHeart =
    document.getElementById("targetHeart");

const particles =
    document.getElementById("particles");

const screens =
    document.querySelectorAll(".screen");


/* =====================================================
   VARIABLES
===================================================== */

let started = false;

let dragging = false;

let arrowReleased = false;

let startX = 0;

let pullDistance = 0;

let currentScene = "";

let timelineTimers = [];


/* =====================================================
   START
===================================================== */

startBtn.addEventListener(
    "click",
    startExperience
);


function startExperience() {

    if (started) {
        return;
    }

    started = true;

    startScreen.classList.remove("active");

    playMusic();

    showScene("heartScene");

    createParticles(15);

    /*
        HEART SCENE
        stays around 3 seconds
    */

    timelineTimers.push(
        setTimeout(() => {

            showScene("arrowScene");

            resetArrow();

        }, 3200)
    );
}


/* =====================================================
   SHOW SCENE
===================================================== */

function showScene(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    const scene =
        document.getElementById(id);

    if (!scene) {
        return;
    }

    scene.classList.add("active");

    currentScene = id;
}


/* =====================================================
   MUSIC
===================================================== */

function playMusic() {

    if (!music) {
        return;
    }

    music.volume = 0.5;

    music.play()
        .then(() => {

            musicBtn.textContent = "♫";

        })
        .catch(() => {

            musicBtn.textContent = "♪";

        });
}


musicBtn.addEventListener(
    "click",
    () => {

        if (!music) {
            return;
        }

        if (music.paused) {

            music.play();

            musicBtn.textContent = "♫";

        } else {

            music.pause();

            musicBtn.textContent = "♪";

        }

    }
);


/* =====================================================
   POINTER POSITION
===================================================== */

function getPointerX(event) {

    if (
        event.touches &&
        event.touches.length
    ) {

        return event.touches[0].clientX;

    }

    if (
        event.changedTouches &&
        event.changedTouches.length
    ) {

        return event.changedTouches[0].clientX;

    }

    return event.clientX;
}


/* =====================================================
   START DRAG
===================================================== */

function startDrag(event) {

    if (
        arrowReleased ||
        currentScene !== "arrowScene"
    ) {
        return;
    }

    dragging = true;

    startX =
        getPointerX(event);

    pullDistance = 0;

    arrow.style.transition = "none";

    bowString.style.transition = "none";

    if (event.cancelable) {
        event.preventDefault();
    }
}


/* =====================================================
   DRAG ARROW
===================================================== */

function moveArrow(event) {

    if (!dragging) {
        return;
    }

    if (arrowReleased) {
        return;
    }

    const currentX =
        getPointerX(event);

    let distance =
        startX - currentX;

    /*
        Limit how far arrow can be pulled.
    */

    distance =
        Math.max(
            0,
            Math.min(
                110,
                distance
            )
        );

    pullDistance =
        distance;

    /*
        Move arrow backward.
    */

    arrow.style.transform =
        `translateX(${-distance}px) translateY(-50%)`;

    /*
        Pull string.
    */

    bowString.style.transform =
        `translateX(${-distance / 2}px) translateY(-50%)`;

    if (event.cancelable) {
        event.preventDefault();
    }
}


/* =====================================================
   RELEASE
===================================================== */

function releaseArrow() {

    if (!dragging) {
        return;
    }

    dragging = false;

    /*
        Need enough pull.
    */

    if (pullDistance >= 35) {

        shootArrow();

    } else {

        resetArrow();

    }
}


/* =====================================================
   SHOOT ARROW
===================================================== */

function shootArrow() {

    if (arrowReleased) {
        return;
    }

    arrowReleased = true;

    /*
        Get exact positions.
    */

    const arrowRect =
        arrow.getBoundingClientRect();

    const heartRect =
        targetHeart.getBoundingClientRect();

    const arrowCenter =
        arrowRect.left +
        arrowRect.width / 2;

    const heartCenter =
        heartRect.left +
        heartRect.width / 2;

    const distance =
        heartCenter -
        arrowCenter;

    /*
        Arrow flies toward heart.
    */

    arrow.style.transition =
        "transform .9s cubic-bezier(.2,.8,.2,1)";

    arrow.style.transform =
        `translateX(${distance}px) translateY(-50%)`;

    /*
        String snaps back.
    */

    bowString.style.transition =
        "transform .25s ease";

    bowString.style.transform =
        "translateX(0) translateY(-50%)";

    /*
        Small particle effect.
    */

    createParticles(12);

    /*
        Wait for arrow to reach heart.
    */

    setTimeout(
        arrowHitsHeart,
        900
    );
}


/* =====================================================
   ARROW HITS HEART
===================================================== */

function arrowHitsHeart() {

    arrow.classList.add("hit");

    targetHeart.classList.add("hit");

    createHeartBurst();

    if (navigator.vibrate) {

        navigator.vibrate([
            40,
            30,
            70
        ]);

    }

    /*
        Move to birthday scene.
    */

    setTimeout(() => {

        arrow.classList.remove("hit");

        targetHeart.classList.remove("hit");

        showBirthdayScene();

    }, 750);
}


/* =====================================================
   BIRTHDAY
===================================================== */

function showBirthdayScene() {

    showScene("birthdayScene");

    createParticles(25);

    timelineTimers.push(
        setTimeout(() => {

            showTreeScene();

        }, 3000)
    );
}


/* =====================================================
   TREE
===================================================== */

function showTreeScene() {

    showScene("treeScene");

    createParticles(20);

    timelineTimers.push(
        setTimeout(() => {

            showPhoto1();

        }, 5000)
    );
}


/* =====================================================
   PHOTO 1
===================================================== */

function showPhoto1() {

    showScene("photo1Scene");

    timelineTimers.push(
        setTimeout(() => {

            showPhoto2();

        }, 3000)
    );
}


/* =====================================================
   PHOTO 2
===================================================== */

function showPhoto2() {

    showScene("photo2Scene");

    timelineTimers.push(
        setTimeout(() => {

            showPhoto3();

        }, 3000)
    );
}


/* =====================================================
   PHOTO 3
===================================================== */

function showPhoto3() {

    showScene("photo3Scene");

    timelineTimers.push(
        setTimeout(() => {

            showQuote();

        }, 3000)
    );
}


/* =====================================================
   QUOTE
===================================================== */

function showQuote() {

    showScene("quoteScene");

    createParticles(25);

    timelineTimers.push(
        setTimeout(() => {

            showFinalScene();

        }, 6500)
    );
}


/* =====================================================
   FINAL
===================================================== */

function showFinalScene() {

    showScene("finalScene");

    createParticles(50);

    /*
        Continue heart particles.
    */

    setInterval(() => {

        if (
            currentScene === "finalScene"
        ) {

            createParticle();

        }

    }, 500);
}


/* =====================================================
   RESET ARROW
===================================================== */

function resetArrow() {

    dragging = false;

    arrowReleased = false;

    pullDistance = 0;

    arrow.style.transition =
        "transform .45s ease";

    arrow.style.transform =
        "translateX(0) translateY(-50%)";

    bowString.style.transition =
        "transform .45s ease";

    bowString.style.transform =
        "translateX(0) translateY(-50%)";
}


/* =====================================================
   MOUSE EVENTS
===================================================== */

arrow.addEventListener(
    "mousedown",
    startDrag
);

document.addEventListener(
    "mousemove",
    moveArrow
);

document.addEventListener(
    "mouseup",
    releaseArrow
);


/* =====================================================
   TOUCH EVENTS
===================================================== */

arrow.addEventListener(
    "touchstart",
    startDrag,
    {
        passive: false
    }
);

document.addEventListener(
    "touchmove",
    moveArrow,
    {
        passive: false
    }
);

document.addEventListener(
    "touchend",
    releaseArrow
);

document.addEventListener(
    "touchcancel",
    releaseArrow
);


/* =====================================================
   PARTICLES
===================================================== */

function createParticle() {

    const particle =
        document.createElement("div");

    particle.className =
        "particle";

    const symbols = [
        "❤️",
        "💗",
        "💖",
        "💕",
        "✨",
        "🌸"
    ];

    particle.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.fontSize =
        (12 + Math.random() * 20) + "px";

    particle.style.animationDuration =
        (4 + Math.random() * 5) + "s";

    particles.appendChild(
        particle
    );

    setTimeout(() => {

        particle.remove();

    }, 10000);
}


function createParticles(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(() => {

            createParticle();

        }, i * 80);

    }
}


/* =====================================================
   HEART BURST
===================================================== */

function createHeartBurst() {

    const rect =
        targetHeart.getBoundingClientRect();

    const centerX =
        rect.left +
        rect.width / 2;

    const centerY =
        rect.top +
        rect.height / 2;

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const heart =
            document.createElement("div");

        heart.textContent =
            "❤️";

        heart.style.position =
            "fixed";

        heart.style.left =
            centerX + "px";

        heart.style.top =
            centerY + "px";

        heart.style.zIndex =
            "3000";

        heart.style.pointerEvents =
            "none";

        heart.style.fontSize =
            (12 + Math.random() * 20) + "px";

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            80 +
            Math.random() * 150;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        const animation =
            heart.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(
                                calc(-50% + ${x}px),
                                calc(-50% + ${y}px)
                            )
                            scale(0)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 1000,
                    easing: "ease-out"
                }
            );

        document.body.appendChild(
            heart
        );

        animation.onfinish =
            () => {

                heart.remove();

            };

    }
}