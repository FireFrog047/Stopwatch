const duration = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const resetBtn = document.querySelector('#reset');
const resumeBtn = document.querySelector('#resume');
const circle = document.querySelector('circle');
const ticking = new Audio('ticking.mp3');
const timeup = new Audio('timeup.mp3');


const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);

let reduceOffset, currentOffset = 0;

class Timer {
    constructor(duration, startBtn, pauseBtn, resetBtn, resumeBtn) {
        this.duration = duration;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;
        this.resetBtn = resetBtn;
        this.resumeBtn = resumeBtn;


        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
        this.resetBtn.addEventListener('click', this.reset);
        this.resumeBtn.addEventListener('click', this.resume);

        resumeBtn.disabled = true;
        pauseBtn.disabled = true;
    }

    start = () => {
        reduceOffset = (perimeter / duration.value);
        currentOffset -= reduceOffset;
        this.tick();
        this.interval = setInterval(this.tick, 1000);

        startBtn.disabled = true;
        pauseBtn.disabled = false;
    };

    pause = () => {
        clearInterval(this.interval);

        startBtn.disabled = true;
        resumeBtn.disabled = false;
        pauseBtn.disabled = true;
    };

    userInput = () => {
        this.pause();

        resumeBtn.disabled = true;
        startBtn.disabled = false;
        pauseBtn.disabled = true;

        circle.setAttribute('stroke-dashoffset', 0);
        currentOffset = 0;
    }

    resume = () => {
        this.tick();
        this.interval = setInterval(this.tick, 1000);

        resumeBtn.disabled = true;
        pauseBtn.disabled = false;
    }

    reset = () => {
        this.pause();
        this.duration.value = 30;

        resumeBtn.disabled = true;
        startBtn.disabled = false;
        pauseBtn.disabled = true;

        circle.setAttribute('stroke-dashoffset', 0);
        currentOffset = 0;
    };

    tick = () => {
        const timeRamain = parseFloat(this.duration.value);
        if (timeRamain == 0) {
            this.pause();
            timeup.play();

            circle.setAttribute('stroke-dashoffset', 0)
            currentOffset = 0;

            resumeBtn.disabled = true;

        } else {
            ticking.play();
            this.duration.value = timeRamain - 1;
            circle.setAttribute('stroke-dashoffset', currentOffset);
            currentOffset -= reduceOffset;

        }
    };

}
const t1 = new Timer(duration, startBtn, pauseBtn, resetBtn, resumeBtn);