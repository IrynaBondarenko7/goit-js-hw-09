const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

refs.btnStop.disabled = true;

const switcher = {
  isActive: false,
  switchId: null,

  onStartButtonClick() {
    if (this.isActive) return;

    this.isActive = true;

    this.switchId = setInterval(() => {
      refs.btnStart.disabled = true;
      refs.btnStop.disabled = false;
      document.body.style.backgroundColor = this.getRandomHexColor();
    }, 1000);
  },
  onStopButtonClick() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
    clearInterval(this.switchId);
    this.isActive = false;
    this.switchId = undefined;
  },
  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },
};

refs.btnStart.addEventListener('click', () => {
  switcher.onStartButtonClick();
});
refs.btnStop.addEventListener('click', () => {
  switcher.onStopButtonClick();
});
