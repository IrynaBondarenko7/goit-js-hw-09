const t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")},o={isActive:!1,switchId:null,onStartButtonClick(){this.isActive||(this.isActive=!0,this.switchId=setInterval((()=>{t.btnStart.disabled=!0,t.btnStop.disabled=!1,document.body.style.backgroundColor=this.getRandomHexColor()}),1e3))},onStopButtonClick(){t.btnStart.disabled=!1,t.btnStop.disabled=!0,clearInterval(this.switchId),this.switchId=void 0},getRandomHexColor:()=>`#${Math.floor(16777215*Math.random()).toString(16)}`};t.btnStart.addEventListener("click",(()=>{o.onStartButtonClick()})),t.btnStop.addEventListener("click",(()=>{o.onStopButtonClick()}));
//# sourceMappingURL=01-color-switcher.7329194d.js.map