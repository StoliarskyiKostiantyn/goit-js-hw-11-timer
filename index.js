class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    (this.timer = document.querySelector(this.selector)),
      (this.refs = {
        days: this.timer.querySelector('[data-value="days"]'),
        hours: this.timer.querySelector('[data-value="hours"]'),
        mins: this.timer.querySelector('[data-value="mins"]'),
        secs: this.timer.querySelector('[data-value="secs"]'),
      });
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = getTimeComponents(deltaTime);

      this.updateTimeInterfase(time);
    }, 1000);
  }
  updateTimeInterfase({ days, hours, mins, secs }) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

function pad(val) {
  return String(val).padStart(2, "0");
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("September 1, 2021"),
});

timer.start();
