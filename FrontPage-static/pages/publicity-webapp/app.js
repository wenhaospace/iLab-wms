// Carousel
//页面初始化
window.onload = initCarousel;
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
