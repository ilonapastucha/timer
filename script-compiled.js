class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.count = 0;
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    addResult() {
        if (!this.running) return;
        let counter = this.count += 1;
        let results = document.getElementById('results');
        let times = this.format(this.times).toString();
        results.insertAdjacentHTML('afterbegin', '<li class="results"><p>' + counter + '.</p>' + times + '</li>');
    }

    clearResult() {
        let results = document.getElementById('results');
        this.count = 0;
        results.innerHTML = '';
    }

    splitResult() {
        let results = document.getElementById('results');
        if (results.firstChild.innerHTML === 'TIMER RESET') return;
        results.insertAdjacentHTML('afterbegin', '<li class="results" style="color:dodgerblue">TIMER RESET</li>');
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
    startButton.style.visibility = "hidden";
    stopButton.style.visibility = "visible";
    stopwatch.start();
});

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
    stopButton.style.visibility = "hidden";
    startButton.style.visibility = "visible";
    stopwatch.stop();
});

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    stopwatch.stop();
    stopButton.style.visibility = "hidden";
    startButton.style.visibility = "visible";
    stopwatch.reset();
    stopwatch.print();
    stopwatch.splitResult();
});

let resultButton = document.getElementById('result');
resultButton.addEventListener('click', () => stopwatch.addResult());

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clearResult());
