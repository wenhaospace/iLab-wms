//页面初始化
window.onload = function() {
  initCarousel();
  initSlider();
};

//--------------------------------------------------------------
// Carousel
document
  .querySelector(".carousel-pointer")
  .addEventListener("mouseover", pointerActive);
document
  .querySelector(".carousel-pointer")
  .addEventListener("mouseout", pointerRemoveActive);

//定义变量
var carouselTimer;
let carouselCounter;

function initCarousel() {
  carouselTimer = setInterval(startAnimate(), 5000);
}

//开始轮播 函数
function startAnimate() {
  carouselCounter = carouselCounter == undefined ? 0 : carouselCounter;
  document.querySelector(".first").style.marginLeft = `${-20 *
    carouselCounter}%`;
  removePointerStyle(carouselCounter);
  addPointerStyle(carouselCounter);
  carouselCounter++;
  if (carouselCounter > 4) {
    carouselCounter = 0;
  }
  return startAnimate;
}

//停止轮播 函数
function stopAnimate() {
  window.clearInterval(carouselTimer);
}

// 添加指示器样式
function addPointerStyle(num) {
  document.getElementById(`carousel-pointer-item${num}`).classList =
    "carousel-pointer-item-active";
}

// 移除单个指示器样式
function removePointerStyle(num) {
  document.getElementById(
    `carousel-pointer-item${num === 0 ? 4 : num - 1}`
  ).classList = "";
}
// 移除其他指示器样式
function removeOtherPointerStyle(num) {
  for (let i = 0; i < 5; i++) {
    if (i === num) {
      continue;
    }
    document.getElementById(`carousel-pointer-item${i}`).classList = "";
  }
}

//鼠标激活指示器 函数
function pointerActive(e) {
  if (e.target.parentElement.classList.contains("carousel-pointer")) {
    stopAnimate();
    let num = Number(e.target.id.slice(-1));
    addPointerStyle(num);
    removeOtherPointerStyle(num);
    carouselCounter = num;
    document.querySelector(".first").style.marginLeft = `${-20 * num}%`;
  }
}

//鼠标移开指示器 函数
function pointerRemoveActive(e) {
  if (e.target.parentElement.classList.contains("carousel-pointer")) {
    initCarousel();
  }
}

//---------------------------------------------------------------------------------------
// Section-1

document.querySelectorAll(".icon-item").forEach(function(item) {
  item.addEventListener("click", showChange);
});

function showChange(e) {
  // inactive 全部 icon
  inaciveIcon();

  // console.log(e.target);

  // active 当前 icon
  let num = activeIcon(e.target);

  // 移动 triangle
  moveTriangle(num);

  // 改变文本
  changeText(num);
}

function inaciveIcon() {
  document.querySelectorAll("i").forEach(function(item) {
    item.classList = "icon-inactive";
  });
}

function activeIcon(item) {
  let num;
  if (item.classList.contains("icon-item")) {
    num = Number(item.id.slice(-1));
    document.getElementById(item.id).children[0].classList = "icon-active";
  } else if (item.parentElement.classList.contains("icon-item")) {
    num = Number(item.parentElement.id.slice(-1));
    document.getElementById(item.parentElement.id).children[0].classList =
      "icon-active";
  } else {
    num = Number(item.parentElement.parentElement.id.slice(-1));
    document.getElementById(
      item.parentElement.parentElement.id
    ).children[0].classList = "icon-active";
  }
  return num;
}

function moveTriangle(num) {
  switch (num) {
    case 1:
      document.querySelector(".triangle").style.left = "65px";
      break;
    case 2:
      document.querySelector(".triangle").style.left = "392px";
      break;
    case 3:
      document.querySelector(".triangle").style.left = "720px";
      break;
    case 4:
      document.querySelector(".triangle").style.left = "1047px";
      break;
  }
}

function changeText(num) {
  for (let i = 1; i < 5; i++) {
    if (i == num) {
      document.querySelector(`.wave-text-${i}`).style.display = "block";
    } else {
      document.querySelector(`.wave-text-${i}`).style.display = "none";
    }
  }
}

// --------------------------------------------------------------------------
// Section-2  Slider
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
