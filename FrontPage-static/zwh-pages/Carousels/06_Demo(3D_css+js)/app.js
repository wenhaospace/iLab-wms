// 页面加载后触发事件
window.onload = initSlider;
let sliderTimer; //定时器变量
let currentNum = 1; // 滚动变量
// 监听slider点击事件
document.getElementById("slider").addEventListener("click", function(e) {
  if (e.target.name === "slider") {
    // console.log(Number(e.target.id.slice(-1)));
    let sliderNum = Number(e.target.id.slice(-1));
    activeIndicator(sliderNum);
  }
});
// 监听indicator mouseover事件
document.querySelectorAll(".indicator-item").forEach(indicator => {
  indicator.addEventListener("mouseover", function(e) {
    if (
      e.target.classList.contains("indicator-item-pointer") ||
      e.target.classList.contains("indicator-item-title")
    ) {
      // console.log(e.target.parentElement.classList[4].slice(-1));
      let pointerNum = Number(e.target.parentElement.classList[4].slice(-1));
      activeSlider(pointerNum);
      activeIndicator(pointerNum);
    }
  });
});

//初始化Slider模块;
function initSlider() {
  sliderTimer = setInterval(startSlider(), 2000);
}

// startSlider 开始滚动
function startSlider() {
  console.log(currentNum);
  activeIndicator(currentNum);
  activeSlider(currentNum);
  currentNum++;
  if (currentNum > 6) {
    currentNum = 1;
  }
  return startSlider;
}

// function stopSlider() {
//   window.clearInterval(sliderTimer);
// }

// 激活对应指示器样式
function activeIndicator(num) {
  // 清除所有指示器的激活样式
  clearAllIndicator();
  // 激活对应 num 的指示器样式
  // console.log(document.querySelector(`.i${num}`).children[0]);
  document.querySelector(`.i${num}`).children[0].classList =
    "indicator-item-pointer indicator-item-pointer-active";
  currentNum = num;
}

// 清除所有指示器激活样式
function clearAllIndicator() {
  document.querySelectorAll(".indicator-item-pointer").forEach(pointer => {
    pointer.classList = "indicator-item-pointer";
  });
}

// 激活对应的slider input
function activeSlider(num) {
  document.getElementById(`s${num}`).checked = "checked";
  currentNum = num;
}
